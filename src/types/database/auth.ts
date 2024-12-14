import type { Database } from '@/integrations/supabase/types';

export type Tables = Database;
export type TableRow<T extends keyof Database> = Database[T]['Row'];
export type TableInsert<T extends keyof Database> = Database[T]['Insert'];
export type TableUpdate<T extends keyof Database> = Database[T]['Update'];