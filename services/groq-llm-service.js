import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const groqModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  streaming: true,
  temperature: 0.5,
});

export const getChatStream = async (systemPrompt, messages) => {
  const formattedMessages = messages.map(m => 
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );

  return await groqModel.stream([
    new SystemMessage(systemPrompt),
    ...formattedMessages
  ]);
};