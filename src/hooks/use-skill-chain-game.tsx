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
  const [combo, setCombo] = useState(0);
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
          action_concrete,
          exemples,
          category_id,
          created_at,
          updated_at,
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

  const handleAddSkill = (skill: Skill) => {
    if (chain.length === 0 || isValidConnection(chain[chain.length - 1], skill)) {
      setChain([...chain, skill]);
      const points = calculatePoints(chain.length, combo);
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);
      
      toast({
        title: "Bonne connexion !",
        description: `+${points} points${combo > 0 ? ` (Combo x${combo + 1})` : ''}`,
      });
    } else {
      setCombo(0);
      toast({
        title: "Connection invalide",
        description: "Ces compétences ne peuvent pas être liées",
        variant: "destructive",
      });
    }
  };

  const isValidConnection = (prevSkill: Skill, nextSkill: Skill) => {
    // Vérifie si les compétences sont de la même catégorie
    if (prevSkill.category_id === nextSkill.category_id) {
      return true;
    }

    // Vérifie si les compétences ont des mots-clés en commun dans leur description
    const prevWords = prevSkill.description.toLowerCase().split(' ');
    const nextWords = nextSkill.description.toLowerCase().split(' ');
    const commonWords = prevWords.filter(word => 
      word.length > 3 && nextWords.includes(word)
    );

    return commonWords.length > 0;
  };

  const calculatePoints = (chainLength: number, currentCombo: number) => {
    // Points de base : 2^(longueur-1) * 10
    const basePoints = Math.pow(2, chainLength - 1) * 10;
    
    // Bonus de combo : +20% par combo
    const comboMultiplier = 1 + (currentCombo * 0.2);
    
    // Bonus de temps restant : jusqu'à +50% si beaucoup de temps restant
    const timeBonus = 1 + (timeLeft / 180) * 0.5;
    
    return Math.round(basePoints * comboMultiplier * timeBonus);
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