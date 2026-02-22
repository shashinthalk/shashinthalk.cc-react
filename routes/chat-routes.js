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

    // 1. Generate embedding for the question
    const queryVector = await embeddingModel.embedQuery(userQuery);

    // 2. Check for semantic match in Supabase
    const cachedItem = await searchCache(queryVector);
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (cachedItem) {
      console.log("⚡ Cache Hit!");
      return res.end(cachedItem.response);
    }

    // 3. Cache Miss: Get fresh content from LLM
    const personaPath = path.join(process.cwd(), 'config/system-messages/persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');
    const stream = await getChatStream(systemPrompt, messages);

    let fullResponse = "";
    for await (const chunk of stream) {
      if (chunk.content) {
        fullResponse += chunk.content;
        res.write(chunk.content);
      }
    }

    // 4. Store the new high-quality answer for next time
    saveToCache(userQuery, fullResponse, queryVector);

    res.end();
  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).send("Agent is currently recalibrating.");
  }
});

export default router;