import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kioxqfgtqpwxcagefvki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpb3hxZmd0cXB3eGNhZ2VmdmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzIzMzgsImV4cCI6MjAyMjQ0ODMzOH0.GQyJSEXBqgqz3OGrAkfHGCL1P7fGM2lrBTgHJxQkk0c';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});