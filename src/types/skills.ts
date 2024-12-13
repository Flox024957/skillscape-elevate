export interface Skill {
  id: string;
  titre: string;
  resume?: string | null;
  explication?: string | null;
  action_concrete?: string | null;
  exemples?: any[] | null;
  category_id?: string | null;
}

export interface UserSkill {
  skill_id: string;
  sections_selectionnees: string[] | null;
  est_maitrisee: boolean;
  maitrisee_le?: string | null;
  skills: Skill;
}