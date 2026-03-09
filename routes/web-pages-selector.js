import express from 'express';
import fs from 'fs';
import path from 'path';
import { getChatStream } from '../services/groq-llm-service.js';

const router = express.Router();

router.post('/get-web-content', async (req, res) => {
  try {
    const { messages } = req.body;
    const personaPath = path.join(process.cwd(), 'config/system-messages/content-render.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');

    const stream = await getChatStream(systemPrompt, messages);
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    let fullContent = "";

    for await (const chunk of stream) {
      if (chunk.content) {
        fullContent += chunk.content;
      }
    }

    // This regex finds the first '{' and the last '}' and grabs everything in between.
    const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const cleanJson = jsonMatch[0];
      res.write(cleanJson);
    } else {
      res.status(500).write(JSON.stringify({ status: "invalid", error: "AI failed to produce JSON" }));
    }

    res.end();
  } catch (error) {
    if (!res.headersSent) res.status(500).send("Agent Offline.");
  }
});

export default router;