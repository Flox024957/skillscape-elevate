import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  title: string;
  summary: string | null;
  explanation: string | null;
  concrete_action: string | null;
  examples: Json[] | null;
  category_id: string | null;
}

export interface UserSkill {
  skill_id: string;
  selected_sections: string[] | null;
  is_mastered: boolean;
  mastered_at: string | null;
  skills: Skill;
}

export interface MasteredSkill {
  skill_id: string;
  mastered_at: string;
  skills: {
    id: string;
    title: string;
    summary: string | null;
  };
}