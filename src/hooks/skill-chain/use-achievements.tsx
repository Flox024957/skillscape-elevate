import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition_type: string;
  condition_value: number;
  icon_name: string;
}

export const useAchievements = (userId: string | undefined) => {
  const { toast } = useToast();

  const checkAchievements = async (
    currentScore: number,
    currentCombo: number,
    chainsCreated: number
  ) => {
    if (!userId) return;

    const { data: achievements } = await supabase
      .from("game_achievements")
      .select("*");

    if (!achievements) return;

    const { data: userAchievements } = await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("user_id", userId);

    const unlockedIds = userAchievements?.map((ua) => ua.achievement_id) || [];

    for (const achievement of achievements) {
      if (unlockedIds.includes(achievement.id)) continue;

      let shouldUnlock = false;

      switch (achievement.condition_type) {
        case "score_reached":
          shouldUnlock = currentScore >= achievement.condition_value;
          break;
        case "combo_reached":
          shouldUnlock = currentCombo >= achievement.condition_value;
          break;
        case "chains_created":
          shouldUnlock = chainsCreated >= achievement.condition_value;
          break;
      }

      if (shouldUnlock) {
        await unlockAchievement(userId, achievement);
        toast({
          title: "Achievement débloqué !",
          description: achievement.title,
        });
      }
    }
  };

  const unlockAchievement = async (userId: string, achievement: Achievement) => {
    await supabase
      .from("user_achievements")
      .insert([{ user_id: userId, achievement_id: achievement.id }]);
  };

  return { checkAchievements };
};