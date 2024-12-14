import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/types/game";

export const useGameState = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      // Récupérer d'abord les skills avec leurs catégories
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume,
          description,
          action_concrete,
          categories (
            name
          )
        `)
        .limit(10);

      if (skillsError) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions",
          variant: "destructive",
        });
        return;
      }

      if (skills) {
        // Transformer les skills en questions
        const formattedQuestions: Question[] = skills.map(skill => {
          // Créer des options basées sur différents aspects du skill
          const options = [
            skill.resume || "",
            skill.description || "",
            skill.action_concrete || "",
            `Aucune de ces réponses n'est correcte`
          ].filter(Boolean);

          return {
            id: skill.id,
            category: skill.categories?.name || "Général",
            question: `Quel est le résumé de la compétence "${skill.titre}" ?`,
            options: options,
            correct_answer: skill.resume || "",
            difficulty: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        });

        setQuestions(formattedQuestions);
      }
    };

    fetchQuestions();
    loadHighScore();
  }, [toast]);

  const loadHighScore = async () => {
    const { data: leaderboard } = await supabase
      .from('game_leaderboards')
      .select('score')
      .eq('game_type', 'speed_learning')
      .order('score', { ascending: false })
      .limit(1);

    if (leaderboard && leaderboard.length > 0) {
      setHighScore(leaderboard[0].score);
    }
  };

  const calculatePoints = (timeBonus: number, currentStreak: number) => {
    const basePoints = 10;
    const streakBonus = Math.floor(currentStreak * 0.5);
    const timeBonusPoints = Math.floor(timeBonus * 0.2);
    return {
      total: basePoints + streakBonus + timeBonusPoints,
      breakdown: {
        base: basePoints,
        streak: streakBonus,
        time: timeBonusPoints
      }
    };
  };

  const updateLeaderboard = async (finalScore: number) => {
    const { data: existingEntry } = await supabase
      .from('game_leaderboards')
      .select('*')
      .eq('game_type', 'speed_learning')
      .limit(1);

    if (existingEntry && existingEntry.length > 0) {
      if (finalScore > existingEntry[0].score) {
        await supabase
          .from('game_leaderboards')
          .update({ 
            score: finalScore,
            games_played: existingEntry[0].games_played + 1 
          })
          .eq('id', existingEntry[0].id);
      } else {
        await supabase
          .from('game_leaderboards')
          .update({ 
            games_played: existingEntry[0].games_played + 1 
          })
          .eq('id', existingEntry[0].id);
      }
    } else {
      await supabase
        .from('game_leaderboards')
        .insert({
          game_type: 'speed_learning',
          score: finalScore,
          games_played: 1
        });
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    setScore(0);
    setStreak(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
  };

  const handleAnswer = async (selectedAnswer: string) => {
    if (gameOver) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      const points = calculatePoints(timeLeft, streak);
      setScore(prev => prev + points.total);
      setStreak(prev => prev + 1);

      toast({
        title: "Bonne réponse !",
        description: `+${points.total} points (Base: ${points.breakdown.base}, Série: ${points.breakdown.streak}, Temps: ${points.breakdown.time})`,
        variant: "default",
      });
    } else {
      setStreak(0);
      toast({
        title: "Mauvaise réponse",
        description: "La bonne réponse était : " + currentQuestion.correct_answer,
        variant: "destructive",
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameOver(true);
      const finalScore = score + (isCorrect ? calculatePoints(timeLeft, streak).total : 0);
      await updateLeaderboard(finalScore);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameOver, timeLeft]);

  return {
    questions,
    currentQuestionIndex,
    score,
    timeLeft,
    gameStarted,
    gameOver,
    streak,
    highScore,
    handleStartGame,
    handleAnswer,
    currentQuestion: questions[currentQuestionIndex]
  };
};