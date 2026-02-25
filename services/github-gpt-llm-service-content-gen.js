import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

// Use the same configuration as your chat setup
const config = {
  apiKey: process.env.GITHUB_TOKEN,
  configuration: { baseURL: "https://models.inference.ai.azure.com" },
};

// Chat Model - Updated to use GPT via GitHub/Azure
// Note: Changed model to gpt-4o as gpt-4.1 is not a standard version 
// (Ensure your GITHUB_TOKEN has access to the model name used here)
const contentModel = new ChatOpenAI({
  ...config,
  modelName: "gpt-4o", 
  streaming: true,
  temperature: 0.2, // Lower temperature is better for strict JSON/UI logic
});

/**
 * Generates structured content for the portfolio UI
 * @param {string} systemPrompt - The "Nishan AI Site Architect" instructions
 * @param {Array} messages - The user conversation history
 */
export const getChatStream = async (systemPrompt, messages) => {
  const formattedMessages = messages.map(m => 
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );

  // We include the JSON instructions here to ensure the model 
  // adheres to the Headless UI format during the stream
  return await contentModel.stream([
    new SystemMessage(systemPrompt),
    ...formattedMessages
  ]);
};