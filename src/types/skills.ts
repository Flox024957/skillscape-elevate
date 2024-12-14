import { Json } from "@/integrations/supabase/types";

export interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  title: string;
  summary: string;
  description: string;
  examples: Json;
  concrete_action: string;
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
    title: string;
    summary: string | null;
  };
}

// Helper function to transform French column names to English for UI
export const transformSkill = (skill: any) => ({
  id: skill.id,
  title: skill.titre,
  summary: skill.resume,
  description: skill.description,
  concrete_action: skill.action_concrete,
  examples: skill.exemples,
  category_id: skill.category_id,
  created_at: skill.created_at,
  updated_at: skill.updated_at,
  category: skill.categories,
});