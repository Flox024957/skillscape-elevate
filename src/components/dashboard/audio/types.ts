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

export interface CurrentPlaylist {
  id: string;
  name: string;
  skills: Skill[];
  skill_order: number[];
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  skills: Skill[];
}