export type Profile = {
  id: string;
  pseudo: string | null;
  image_profile: string | null;
  description: string | null;
  current_job: string | null;
  dream_job: string | null;
  personal_goals: Json | null;
  created_at: string;
  updated_at: string;
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];