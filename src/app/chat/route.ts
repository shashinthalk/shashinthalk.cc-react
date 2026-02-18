import { ChatGroq } from "@langchain/groq";
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse } from "ai";

export const runtime = "edge"; // Groq is fast, Edge makes it faster

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Initialize LangChain's Groq Model
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });

  // 2. Convert Vercel AI SDK messages to LangChain format
  const langchainMessages = await toBaseMessages(messages);

  // 3. Stream from LangChain
  const stream = await model.stream(langchainMessages);

  // 4. Respond using Vercel AI SDK's stream helper
  return createUIMessageStreamResponse({
    stream: toUIMessageStream(stream),
  });
}