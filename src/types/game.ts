import { Json } from "@/integrations/supabase/types";

export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: number;
  created_at: string;
  updated_at: string;
}

export interface GameLeaderboard {
  id: string;
  game_type: string;
  user_id: string;
  score: number;
  games_played: number;
  games_won: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    pseudo: string;
    image_profile: string;
  };
}