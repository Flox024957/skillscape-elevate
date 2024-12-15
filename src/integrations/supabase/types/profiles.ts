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
  education: Education[];
  experience: Experience[];
  banner_image: string | null;
  // Add missing properties
  location: string | null;
  website: string | null;
  interests: string[] | null;
  languages: string[] | null;
  social_links: Json | null;
};

export type Experience = {
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];