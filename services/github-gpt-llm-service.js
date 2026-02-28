import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { searchCache, saveToCache } from "./semantic-cache-with-supabase.js";

const config = {
  apiKey: process.env.GITHUB_TOKEN,
  configuration: { baseURL: "https://models.inference.ai.azure.com" },
};

// 1536-dimensional embedding model for vector search
export const embeddingModel = new OpenAIEmbeddings({
  ...config,
  modelName: "text-embedding-3-small",
});

// High-performance LLM for generating structured responses
const chatModel = new ChatOpenAI({
  ...config,
  modelName: "gpt-4o",
  streaming: true,
  temperature: 0.7,
});

/**
 * Main chat logic: Semantic Search -> LLM Fallback -> UI Formatting -> Multi-entry Caching
 */
export const processChatMessage = async (systemPrompt, messages) => {
  const userQuery = messages[messages.length - 1].content;
  
  // --- STEP 1: SEMANTIC CACHE LOOKUP ---
  const queryVector = await embeddingModel.embedQuery(userQuery);
  const cachedItem = await searchCache(queryVector);

  if (cachedItem) {
    console.log("[CACHE] HIT - Returning stored response");
    return cachedItem.response; // Returns the full "Text|UI_DATA|{json}" string
  }

  // --- STEP 2: LLM GENERATION (CACHE MISS) ---
  console.log("[CACHE] MISS - Generating fresh response");
  const formattedMessages = messages.map(m => 
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
  
  // Initialize the stream from the model
  const stream = await chatModel.stream([
    new SystemMessage(systemPrompt), 
    ...formattedMessages
  ]);
  
  let rawFullResponse = "";
  for await (const chunk of stream) {
    if (chunk.content) rawFullResponse += chunk.content;
  }

  // --- STEP 3: PARSE AND FORMAT PAYLOAD ---
  let mainAnswer = "";
  let syntheticQuestions = [];
  let uiActionData = null;

  // Extract JSON block from LLM's raw text output
  const jsonMatch = rawFullResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const result = JSON.parse(jsonMatch[0]);
      mainAnswer = result.main_answer || rawFullResponse;
      syntheticQuestions = result.synthetic_data || [];
      uiActionData = result.ui_action || null;
    } catch (e) {
      console.error("JSON Parsing failed, using raw response");
      mainAnswer = rawFullResponse;
    }
  } else {
    mainAnswer = rawFullResponse;
  }

  // Construct the "Final Payload" (What the frontend ChatComponent expects)
  let finalPayload = mainAnswer;
  if (uiActionData && uiActionData.show_button) {
    finalPayload += `|UI_DATA|${JSON.stringify(uiActionData)}`;
  }

  // --- STEP 4: BACKGROUND MULTI-CACHING ---
  // 1. Save the primary interaction
  const tasks = [saveToCache(userQuery, finalPayload, queryVector)];
  
  // 2. Process synthetic questions to include the same button logic
  if (syntheticQuestions.length > 0) {
    syntheticQuestions.forEach(pair => {
      tasks.push((async () => {
        try {
          // IMPORTANT: If a button was generated for the main answer, 
          // we attach the same button logic to the synthetic question response.
          let syntheticResponse = pair.answer;
          if (uiActionData && uiActionData.show_button) {
            syntheticResponse += `|UI_DATA|${JSON.stringify(uiActionData)}`;
          }

          const vec = await embeddingModel.embedQuery(pair.question);
          return saveToCache(pair.question, syntheticResponse, vec);
        } catch (err) {
          console.error("Synthetic caching failed for question:", pair.question);
        }
      })());
    });
  }
  
  // Fire-and-forget background saving
  Promise.all(tasks).catch(e => console.error("Critical Cache Save Error:", e));

  return finalPayload;
};