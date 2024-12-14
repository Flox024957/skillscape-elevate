import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import type { Skill } from "@/types/skills";
import type { Achievement, UserAchievement } from "@/types/achievements";
import { useAchievements } from "./skill-chain/use-achievements";
import { useSkillValidation } from "./skill-chain/use-skill-validation";
import { useScoring } from "./skill-chain/use-scoring";

export const useSkillChainGame = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [chain, setChain] = useState<Skill[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  
  const { toast } = useToast();
  const user = useUser();
  const { checkAchievements } = useAchievements(user?.id);
  const { isValidConnection } = useSkillValidation();
  const { calculatePoints } = useScoring();

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select(`
          id,
          titre,
          resume,
          description,
          action_concrete,
          exemples,
          category_id,
          created_at,
          updated_at,
          categories (
            id,
            name,
            description
          )
        `);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les compétences",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setSkills(data as Skill[]);
      }
    };

    fetchSkills();
  }, [toast]);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameOver, timeLeft]);

  const handleAddSkill = async (skill: Skill) => {
    if (chain.length === 0 || isValidConnection(chain[chain.length - 1], skill)) {
      const newChain = [...chain, skill];
      setChain(newChain);
      const points = calculatePoints(chain.length, combo, timeLeft);
      const newScore = score + points;
      setScore(newScore);
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      toast({
        title: "Bonne connexion !",
        description: `+${points} points${combo > 0 ? ` (Combo x${combo + 1})` : ''}`,
      });

      if (user?.id) {
        await checkAchievements(newScore, newCombo, newChain.length);
      }
    } else {
      setCombo(0);
      toast({
        title: "Connexion invalide",
        description: "Ces compétences ne peuvent pas être liées",
        variant: "destructive",
      });
    }
  };

  const handleRestart = () => {
    setChain([]);
    setScore(0);
    setTimeLeft(180);
    setGameOver(false);
    setCombo(0);
  };

  return {
    skills,
    chain,
    score,
    timeLeft,
    gameOver,
    combo,
    handleAddSkill,
    handleRestart,
  };
};