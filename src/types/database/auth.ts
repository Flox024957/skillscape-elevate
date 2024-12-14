import type { Database } from "@/integrations/supabase/types";

export type AuthUser = Database["public"]["Tables"]["auth"]["Row"];
export type AuthUserInsert = Database["public"]["Tables"]["auth"]["Insert"];
export type AuthUserUpdate = Database["public"]["Tables"]["auth"]["Update"];