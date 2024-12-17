import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kioxqfgtqpwxcagefvki.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpb3hxZmd0cXB3eGNhZ2VmdmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDUzNzUsImV4cCI6MjA0OTYyMTM3NX0.RIKy5jdIezZz8ojiSSTU7Z9XF2a8FGKuXFq4fWwBeFU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);