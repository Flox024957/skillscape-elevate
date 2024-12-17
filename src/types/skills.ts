import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: Json[];
  category_id: string | null;
  created_at: string;
  updated_at: string;
  categories?: {
    id: string;
    name: string;
  };
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  sections_selectionnees: string[] | null;
  skills: Skill;
}

export interface MasteredSkill {
  id: string;
  skill_id: string;
  mastered_at: string | null;
  notes: string | null;
  skills: {
    id: string;
    titre: string;
    resume: string | null;
  };
}

export const transformSkill = (skill: Skill) => ({
  id: skill.id,
  title: skill.titre,
  summary: skill.resume,
  description: skill.description,
  concrete_action: skill.action_concrete,
  examples: Array.isArray(skill.exemples) ? skill.exemples : [],
  category_id: skill.category_id,
  created_at: skill.created_at,
  updated_at: skill.updated_at,
});