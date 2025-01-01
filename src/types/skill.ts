export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: string[];
  category_id?: string;
  categories?: {
    id: string;
    name: string;
  };
}