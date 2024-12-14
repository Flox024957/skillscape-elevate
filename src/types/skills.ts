import { Json } from "@/integrations/supabase/types";

export interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: Json;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function to normalize examples array
export const normalizeExamples = (examples: Json): Json[] => {
  if (Array.isArray(examples)) {
    return examples;
  }
  return [];
};