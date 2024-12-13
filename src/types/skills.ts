import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  category_id: string | null;
  titre: string;
  resume: string | null;
  explication: string | null;
  action_concrete: string | null;
  exemples: Json[] | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  skills: Skill[];
}