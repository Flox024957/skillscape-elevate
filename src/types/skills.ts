import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  titre: string;
  resume: string | null;
  explication: string | null;
  action_concrete: string | null;
  exemples: Json[] | null;
  category_id: string | null;
}

export interface UserSkill {
  skill_id: string;
  sections_selectionnees: string[] | null;
  est_maitrisee: boolean;
  maitrisee_le: string | null;
  skills: Skill;
}

export interface MasteredSkill {
  skill_id: string;
  maitrisee_le: string;
  skills: {
    id: string;
    titre: string;
    resume: string | null;
  };
}