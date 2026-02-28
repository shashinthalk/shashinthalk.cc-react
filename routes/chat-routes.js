import express from 'express';
import fs from 'fs';
import path from 'path';
import { processChatMessage } from '../services/github-gpt-llm-service.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const personaPath = path.join(process.cwd(), 'config/system-messages/persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Get the final formatted string from service
    const output = await processChatMessage(systemPrompt, messages);

    res.write(output);
    res.end();
  } catch (error) {
    console.error("Route Error:", error);
    if (!res.headersSent) {
      res.status(500).send("Agent Offline.");
    }
  }
});

export default router;