import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Read the optimized persona
    const personaPath = path.join(__dirname, 'persona.txt');
    const systemPrompt = fs.readFileSync(personaPath, 'utf8');

    const groqModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      streaming: true,
      temperature: 0.5, // Lower temperature = less "hallucination" and rambling
    });

    // Clean formatting to prevent "role confusion"
    const formattedMessages = messages.map(m => 
      m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
    );

    const finalMessages = [
      new SystemMessage(systemPrompt),
      ...formattedMessages
    ];

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const stream = await groqModel.stream(finalMessages);

    for await (const chunk of stream) {
      if (chunk.content) res.write(chunk.content);
    }
    res.end();
  } catch (error) {
    console.error("Agent Error:", error.message);
    if (!res.headersSent) res.status(500).send("Agent Offline.");
  }
});

app.listen(3000, () => console.log('🚀 Optimized Agent on 3000'));