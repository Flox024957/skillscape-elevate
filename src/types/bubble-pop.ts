import type { Database } from "@/integrations/supabase/types";

type Skill = Database["public"]["Tables"]["skills"]["Row"] & {
  categories?: {
    name: string;
  } | null;
};

export interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  skill: Skill;
  questionType: "titre" | "resume" | "description" | "action_concrete";
  color: string;
}