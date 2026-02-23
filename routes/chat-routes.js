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
      return res.end(cachedItem.response);
    }

    // 2. Get LLM Response
    const personaPath = path.join(process.cwd(), 'config/system-messages/persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');
    const stream = await getChatStream(systemPrompt, messages);

    console.log("LLM stream started for query:", stream);

    let rawFullResponse = "";
    for await (const chunk of stream) {
      if (chunk.content) rawFullResponse += chunk.content;
    }

    // 3. SAFE PARSING: Use Regex to find JSON block
    let mainAnswer = "";
    let extraPairs = [];
    let isOutOfScope = false;

    const jsonMatch = rawFullResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        mainAnswer = result.main_answer;
        extraPairs = result.synthetic_data || [];
        isOutOfScope = result.out_of_scope || false;
      } catch (e) {
        // If JSON is malformed, use the raw text as a fallback
        mainAnswer = rawFullResponse;
      }
    } else {
      // No JSON found at all, treat the whole response as the answer
      mainAnswer = rawFullResponse;
    }

    // 4. Send the answer immediately
    res.write(mainAnswer);
    res.end();

    // 5. Background Caching
    const tasks = [saveToCache(userQuery, mainAnswer, queryVector)];

    if (!isOutOfScope && extraPairs.length > 0) {
      const syntheticTasks = extraPairs.map(async (pair) => {
        try {
          const vec = await embeddingModel.embedQuery(pair.question);
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