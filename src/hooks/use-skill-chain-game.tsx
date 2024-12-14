import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { useAchievements } from "./skill-chain/use-achievements";
import { useSkillValidation } from "./skill-chain/use-skill-validation";
import { useScoring } from "./skill-chain/use-scoring";
import type { Achievement } from "@/types/achievements";

export const useSkillChainGame = () => {
  const user = useUser();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { checkAchievements, unlockAchievement } = useAchievements();
  const { validateConnection } = useSkillValidation();
  const { calculateScore } = useScoring();

  const checkAndUnlockAchievements = () => {
    if (user?.id) {
      checkAchievements(user.id, score);
    }
  };

  useEffect(() => {
    checkAndUnlockAchievements();
  }, [score, user?.id, checkAchievements]);

  return {
    gameOver,
    score,
    handleGameOver: () => setGameOver(true),
    handleRestart: () => {
      setGameOver(false);
      setScore(0);
    },
    handleValidConnection: (sourceId: string, targetId: string) => {
      const isValid = validateConnection(sourceId, targetId);
      if (isValid) {
        const points = calculateScore(sourceId, targetId);
        setScore((prev) => prev + points);
      }
      return isValid;
    },
  };
};
