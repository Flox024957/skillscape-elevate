import type { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']> = Database['public'][T];
export type TablesInsert<T extends keyof Database['public']> = Database['public'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']> = Database['public'][T]['Update'];