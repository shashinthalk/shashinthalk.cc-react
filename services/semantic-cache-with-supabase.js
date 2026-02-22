import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export const searchCache = async (queryVector) => {
  const { data, error } = await supabase.rpc('match_cache', {
    query_embedding: queryVector,
    match_threshold: 0.7,
    match_count: 1
  });
  if (error) throw error;
  return data?.[0] || null;
};

export const saveToCache = async (prompt, response, embedding) => {
  const { error } = await supabase.from('llm_cache').insert({
    prompt,
    response,
    embedding
  });
  if (error) console.error("Cache save failed:", error.message);
};