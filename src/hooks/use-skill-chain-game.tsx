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

  const isValidConnection = (prevSkill: Skill, nextSkill: Skill) => {
    // Vérifie si les compétences sont de la même catégorie
    if (prevSkill.category_id === nextSkill.category_id) {
      toast({
        title: "Connexion par catégorie !",
        description: `Les compétences sont de la catégorie ${prevSkill.categories?.name}`,
      });
      return true;
    }

    // Vérifie les mots-clés dans la description et l'action concrète
    const prevWords = [
      ...prevSkill.description.toLowerCase().split(' '),
      ...prevSkill.action_concrete.toLowerCase().split(' ')
    ];
    const nextWords = [
      ...nextSkill.description.toLowerCase().split(' '),
      ...nextSkill.action_concrete.toLowerCase().split(' ')
    ];

    const commonWords = prevWords.filter(word => 
      word.length > 3 && nextWords.includes(word)
    );

    if (commonWords.length > 0) {
      toast({
        title: "Connexion par mots-clés !",
        description: `Mots-clés communs : ${commonWords.join(', ')}`,
      });
      return true;
    }

    // Vérifie les exemples pour des connexions possibles
    const prevExamples = Array.isArray(prevSkill.exemples) ? prevSkill.exemples : [];
    const nextExamples = Array.isArray(nextSkill.exemples) ? nextSkill.exemples : [];
    
    const exampleWords = prevExamples.flatMap(ex => String(ex).toLowerCase().split(' '));
    const nextExampleWords = nextExamples.flatMap(ex => String(ex).toLowerCase().split(' '));
    
    const commonExampleWords = exampleWords.filter(word =>
      word.length > 3 && nextExampleWords.includes(word)
    );

    if (commonExampleWords.length > 0) {
      toast({
        title: "Connexion par exemples !",
        description: `Concepts communs trouvés dans les exemples`,
      });
      return true;
    }

    return false;
  };

  const handleAddSkill = async (skill: Skill) => {
    if (chain.length === 0 || isValidConnection(chain[chain.length - 1], skill)) {
      const newChain = [...chain, skill];
      setChain(newChain);
      const points = calculatePoints(chain.length, combo);
      const newScore = score + points;
      setScore(newScore);
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      toast({
        title: "Bonne connexion !",
        description: `+${points} points${combo > 0 ? ` (Combo x${combo + 1})` : ''}`,
      });

      // Vérifier les achievements
      await checkAchievements(newScore, newCombo, newChain.length);
    } else {
      setCombo(0);
      toast({
        title: "Connexion invalide",
        description: "Ces compétences ne peuvent pas être liées",
        variant: "destructive",
      });
    }
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

  // Fonction pour vérifier et débloquer les achievements
  const checkAchievements = async (currentScore: number, currentCombo: number, chainsCreated: number) => {
    const { data: achievements } = await supabase
      .from("game_achievements")
      .select("*");

    if (!achievements) return;

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user?.id) return;

    for (const achievement of achievements) {
      switch (achievement.condition_type) {
        case "score_reached":
          if (currentScore >= achievement.condition_value) {
            await unlockAchievement(user.user.id, achievement.id);
          }
          break;
        case "combo_reached":
          if (currentCombo >= achievement.condition_value) {
            await unlockAchievement(user.user.id, achievement.id);
          }
          break;
        case "chains_created":
          if (chainsCreated >= achievement.condition_value) {
            await unlockAchievement(user.user.id, achievement.id);
          }
          break;
      }
    }
  };

  const unlockAchievement = async (userId: string, achievementId: string) => {
    const { data: existing } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", userId)
      .eq("achievement_id", achievementId)
      .single();

    if (!existing) {
      const { data: achievement } = await supabase
        .from("game_achievements")
        .select("*")
        .eq("id", achievementId)
        .single();

      if (achievement) {
        await supabase
          .from("user_achievements")
          .insert([{ user_id: userId, achievement_id: achievementId }]);

        toast({
          title: "Achievement débloqué !",
          description: achievement.title,
        });
      }
    }
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
