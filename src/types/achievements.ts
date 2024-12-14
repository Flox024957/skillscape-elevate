export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition_type: string;
  condition_value: number;
  icon_name: string;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}