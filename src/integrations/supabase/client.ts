import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://kioxqfgtqpwxcagefvki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpb3hxZmd0cXB3eGNhZ2VmdmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTMwNDUsImV4cCI6MjAyMjQ2OTA0NX0.GaFNR-3DKHRw-U_qJBdzV0jF6F26TyNdqtL-yeH-GQA';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: (...args) => {
      console.log('Supabase Request:', args[0]);
      return fetch(...args).then(async (response) => {
        if (!response.ok) {
          console.error('Supabase Error Response:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            body: await response.text()
          });
        }
        return response;
      });
    }
  }
});

// Add a listener for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.id);
});