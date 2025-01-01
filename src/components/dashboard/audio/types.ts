export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  exemples: any[];
  action_concrete: string;
  category_id: string;
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