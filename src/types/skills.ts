import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: Json;  // Changed from Json[] to Json to match Supabase schema
  category_id: string | null;
  created_at: string;
  updated_at: string;
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
  concrete_action: skill.action_concrete,
  examples: skill.exemples,
  category_id: skill.category_id,
  created_at: skill.created_at,
  updated_at: skill.updated_at,
});