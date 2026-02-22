import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const config = {
  apiKey: process.env.GITHUB_TOKEN,
  configuration: { baseURL: "https://models.inference.ai.azure.com" },
};

// Embedding Model (for turning text into searchable numbers)
export const embeddingModel = new OpenAIEmbeddings({
  ...config,
  modelName: "text-embedding-3-small",
});

// Chat Model (for high-quality content generation)
const chatModel = new ChatOpenAI({
  ...config,
  modelName: "gpt-4.1",
  streaming: true,
  temperature: 0.7,
});

export const getChatStream = async (systemPrompt, messages) => {
  const formattedMessages = messages.map(m => 
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
  return await chatModel.stream([new SystemMessage(systemPrompt), ...formattedMessages]);
};