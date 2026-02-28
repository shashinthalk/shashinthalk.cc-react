import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

const TABLE_NAME = "llm_cache";

/**
 * Executes a semantic similarity search using a stored Postgres function.
 * @param {Array<number>} embedding - The vector generated from the user's query.
 * @param {number} threshold - The similarity score (0-1). 0.4 is a balanced default.
 * @returns {Object|null} - Returns the first matching record or null if no match found.
 */
export const searchCache = async (embedding, threshold = 0.4) => {
  try {
    const { data, error } = await supabase.rpc('match_cache', {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: 1
    });

    if (error) throw error;
    
    // Return the single closest match
    return data && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("[DB Service] Search Error:", err.message);
    return null;
  }
};

/**
 * Persists a prompt, its response, and the corresponding embedding to the database.
 * @param {string} prompt - The original text question.
 * @param {string} response - The formatted response (includes |UI_DATA| if applicable).
 * @param {Array<number>} embedding - The vector representation of the prompt.
 */
export const saveToCache = async (prompt, response, embedding) => {
  try {
    const { error } = await supabase.from(TABLE_NAME).insert({
      prompt,
      response,
      embedding
    });
    if (error) throw error;
    console.log(`[DB Service] Cached new entry for: "${prompt.substring(0, 20)}..."`);
  } catch (err) {
    console.error("[DB Service] Save Error:", err.message);
  }
};