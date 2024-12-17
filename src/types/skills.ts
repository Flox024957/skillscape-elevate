import { Json } from "@/integrations/supabase/types";

export interface Skill {
  id: string;
  titre: string;
  resume: string | null;
  description: string | null;
  action_concrete: string | null;
  exemples: Json[] | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  categories?: {
    id: string;
    name: string;
  };
}

export interface UserSkill {
  skill_id: string;
  sections_selectionnees: string[] | null;
  skills: Skill;
  is_mastered?: boolean;
}

export interface MasteredSkill {
  skill_id: string;
  mastered_at: string;
  notes: string | null;
  skills: {
    id: string;
    titre: string;
    resume: string | null;
  };
}

export interface Friend {
  id: string;
  pseudo: string | null;
  image_profile: string | null;
}

export interface ChatConversation {
  friend: Friend;
  unreadCount: number;
  lastMessage?: {
    content: string;
    created_at: string;
  };
}

export interface Message {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  content: string;
  read: boolean | null;
  created_at: string;
  profiles?: {
    pseudo: string | null;
    image_profile: string | null;
  } | null;
}

// Helper function to transform French column names to English for UI
export const transformSkill = (skill: Skill) => ({
  id: skill.id,
  title: skill.titre,
  summary: skill.resume,
  description: skill.description,
  concrete_action: skill.action_concrete,
  examples: Array.isArray(skill.exemples) ? skill.exemples : [],
  category_id: skill.category_id,
  created_at: skill.created_at,
  updated_at: skill.updated_at,
});