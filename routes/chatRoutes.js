import express from 'express';
import fs from 'fs';
import path from 'path';
import { getChatStream } from '../services/llmService.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const personaPath = path.join(process.cwd(), 'config/system-messages/persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');

    const stream = await getChatStream(systemPrompt, messages);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of stream) {
      if (chunk.content) res.write(chunk.content);
    }
    res.end();
  } catch (error) {
    console.error("Error in /chat route:", error);
    res.status(500).send("Agent Offline.");
  }
});

export default router;