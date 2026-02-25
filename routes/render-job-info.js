import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Supabase with your Env vars
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

// Fetch job emails
router.get('/job-emails', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('job_emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error("Database Fetch Error:", error);
    res.status(500).json({ error: "Failed to retrieve job records." });
  }
});

export default router;