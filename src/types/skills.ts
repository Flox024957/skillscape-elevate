import { Json } from "@/integrations/supabase/types";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
  skills?: Skill[];
}

export interface Skill {
  id: string;
  titre: string;  // French field from DB
  resume: string; // French field from DB
  description: string;
  exemples: Json;
  action_concrete: string;
  category_id?: string | null;
  created_at?: string;
  updated_at?: string;
  categories?: Category | null;
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

// Helper function to transform French column names to English for UI
export const transformSkill = (skill: Skill) => ({
  id: skill.id,
  title: skill.titre,
  summary: skill.resume,
  description: skill.description,
  examples: skill.exemples,
  concrete_action: skill.action_concrete,
  category_id: skill.category_id,
  created_at: skill.created_at,
  updated_at: skill.updated_at,
  category: skill.categories,
});