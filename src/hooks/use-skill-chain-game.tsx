import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Skill } from "@/types/skills";

export const useSkillChainGame = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [chain, setChain] = useState<Skill[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select(`
          id,
          titre,
          resume,
          description,
          category_id,
          categories (
            name
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
        setSkills(data);
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

  const handleAddSkill = (skill: Skill) => {
    if (chain.length === 0 || isValidConnection(chain[chain.length - 1], skill)) {
      setChain([...chain, skill]);
      const points = calculatePoints(chain.length);
      setScore((prev) => prev + points);
      
      toast({
        title: "Bonne connexion !",
        description: `+${points} points`,
      });
    } else {
      toast({
        title: "Connection invalide",
        description: "Ces compétences ne peuvent pas être liées",
        variant: "destructive",
      });
    }
  };

  const isValidConnection = (prevSkill: Skill, nextSkill: Skill) => {
    // Pour l'instant, on considère que les compétences de la même catégorie peuvent être liées
    return prevSkill.category_id === nextSkill.category_id;
  };

  const calculatePoints = (chainLength: number) => {
    return Math.pow(2, chainLength - 1) * 10;
  };

  const handleRestart = () => {
    setChain([]);
    setScore(0);
    setTimeLeft(180);
    setGameOver(false);
  };

  return {
    skills,
    chain,
    score,
    timeLeft,
    gameOver,
    handleAddSkill,
    handleRestart,
  };
};