import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { useAchievements } from "./skill-chain/use-achievements";
import { useSkillValidation } from "./skill-chain/use-skill-validation";
import { useScoring } from "./skill-chain/use-scoring";
import type { Achievement } from "@/types/achievements";

interface Skill {
  id: string;
  name: string;
  category: string;
}

export const useSkillChainGame = () => {
  const user = useUser();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [chain, setChain] = useState<Skill[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [combo, setCombo] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  const { checkAchievements } = useAchievements();
  const { isValidConnection } = useSkillValidation();
  const { calculatePoints } = useScoring();

  const checkAndUnlockAchievements = () => {
    if (user?.id) {
      checkAchievements(score, combo, chain.length);
    }
  };

  useEffect(() => {
    checkAndUnlockAchievements();
  }, [score, user?.id]);

  const handleAddSkill = (skill: Skill) => {
    setChain(prev => [...prev, skill]);
    setCombo(prev => prev + 1);
  };

  return {
    gameOver,
    score,
    chain,
    timeLeft,
    combo,
    skills,
    handleGameOver: () => setGameOver(true),
    handleRestart: () => {
      setGameOver(false);
      setScore(0);
      setChain([]);
      setTimeLeft(60);
      setCombo(0);
    },
    handleValidConnection: (sourceId: string, targetId: string) => {
      const sourceSkill = skills.find(s => s.id === sourceId);
      const targetSkill = skills.find(s => s.id === targetId);
      
      if (sourceSkill && targetSkill && isValidConnection(sourceSkill, targetSkill)) {
        const points = calculatePoints(chain.length, combo, timeLeft);
        setScore(prev => prev + points);
        return true;
      }
      return false;
    },
    handleAddSkill,
  };
};