import express from 'express';
import fs from 'fs';
import path from 'path';
import { getChatStream, embeddingModel } from '../services/github-gpt-llm-service.js';
import { searchCache, saveToCache } from '../services/semantic-cache-with-supabase.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userQuery = messages[messages.length - 1].content;

    // 1. Check Semantic Cache
    const queryVector = await embeddingModel.embedQuery(userQuery);
    const cachedItem = await searchCache(queryVector);
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (cachedItem) {
      // Return the cached reconstructed string (Answer + UI Data)
      return res.end(cachedItem.response);
    }

    // 2. Get LLM Response
    const personaPath = path.join(process.cwd(), 'config/system-messages/persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');
    const stream = await getChatStream(systemPrompt, messages);

    let rawFullResponse = "";
    for await (const chunk of stream) {
      if (chunk.content) rawFullResponse += chunk.content;
    }

    // 3. SAFE PARSING
    let mainAnswer = "";
    let extraPairs = [];
    let isOutOfScope = false;
    let uiActionData = null;

    const jsonMatch = rawFullResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        mainAnswer = result.main_answer || "I'm sorry, I couldn't process that.";
        extraPairs = result.synthetic_data || [];
        isOutOfScope = result.out_of_scope || false;
        uiActionData = result.ui_action || null;
      } catch (e) {
        mainAnswer = rawFullResponse;
      }
    } else {
      mainAnswer = rawFullResponse;
    }

    // 4. Construct the Final Response String for Client & Cache
    let finalPayload = mainAnswer;
    if (uiActionData && uiActionData.show_button) {
      finalPayload += `|UI_DATA|${JSON.stringify(uiActionData)}`;
    }

    // Send to client
    res.write(finalPayload);
    res.end();

    // 5. Background Caching
    // We save the 'finalPayload' so the cache includes the button logic!
    const tasks = [saveToCache(userQuery, finalPayload, queryVector)];

    if (!isOutOfScope && extraPairs.length > 0) {
      const syntheticTasks = extraPairs.map(async (pair) => {
        try {
          const vec = await embeddingModel.embedQuery(pair.question);
          // For synthetic questions, we usually only save the text answer 
          // unless you want them to trigger buttons too.
          return saveToCache(pair.question, pair.answer, vec);
        } catch (err) { return null; }
      });
      tasks.push(...syntheticTasks);
    }

    Promise.all(tasks).catch(err => console.error("Cache Task Error:", err));

  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).send("Agent is currently recalibrating. 🛠️");
  }
});

export default router;