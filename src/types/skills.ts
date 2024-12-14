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
  categories?: {
    id: string;
    name: string;
    description?: string;
  } | null;
}

export interface UserSkill {
  skill_id: string;
  sections_selectionnees: string[] | null;
  skills: Skill;
  is_mastered?: boolean;
}

export interface MasteredSkill {
  skill_id: string;
  mastered_at: string;
  notes: string | null;
  skills: {
    id: string;
    titre: string;
    resume: string | null;
  };
}

// Helper function to normalize examples array
export const normalizeExamples = (examples: Json): Json[] => {
  if (Array.isArray(examples)) {
    return examples;
  }
  return [];
};