import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { FlashCard } from "@/types/flash-cards";

export const useFlashCardsGame = () => {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCards = async () => {
      const { data: skills, error } = await supabase
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

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les cartes",
          variant: "destructive",
        });
        return;
      }

      if (skills) {
        const formattedCards: FlashCard[] = skills.map(skill => {
          const options = [
            skill.resume || "",
            skill.description || "",
            skill.action_concrete || "",
            "Aucune de ces réponses"
          ].filter(Boolean);

          return {
            id: skill.id,
            category: skill.categories?.name || "Général",
            question: `Quel est le résumé de la compétence "${skill.titre}" ?`,
            options: options.sort(() => Math.random() - 0.5),
            correctAnswer: skill.resume || "",
          };
        });

        setCards(formattedCards.sort(() => Math.random() - 0.5));
      }
    };

    fetchCards();
    loadHighScore();
  }, [toast]);

  const loadHighScore = async () => {
    const { data: leaderboard } = await supabase
      .from('game_leaderboards')
      .select('score')
      .eq('game_type', 'flash_cards')
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
    return basePoints + streakBonus + timeBonusPoints;
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setCurrentCardIndex(0);
    setGameOver(false);
  };

  const handleAnswer = async (selectedAnswer: string) => {
    if (gameOver) return;

    const currentCard = cards[currentCardIndex];
    const isCorrect = selectedAnswer === currentCard.correctAnswer;
    
    if (isCorrect) {
      const points = calculatePoints(timeLeft, streak);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);

      toast({
        title: "Bonne réponse !",
        description: `+${points} points`,
        variant: "default",
      });
    } else {
      setStreak(0);
      toast({
        title: "Mauvaise réponse",
        description: "La bonne réponse était : " + currentCard.correctAnswer,
        variant: "destructive",
      });
    }

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setGameOver(true);
      await updateLeaderboard(score + (isCorrect ? calculatePoints(timeLeft, streak) : 0));
    }
  };

  const updateLeaderboard = async (finalScore: number) => {
    const { data: existingEntry } = await supabase
      .from('game_leaderboards')
      .select('*')
      .eq('game_type', 'flash_cards')
      .limit(1);

    if (existingEntry && existingEntry.length > 0) {
      if (finalScore > existingEntry[0].score) {
        await supabase
          .from('game_leaderboards')
          .update({ score: finalScore })
          .eq('id', existingEntry[0].id);
      }
    } else {
      await supabase
        .from('game_leaderboards')
        .insert({
          game_type: 'flash_cards',
          score: finalScore,
          games_played: 1
        });
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
    currentCard: cards[currentCardIndex],
    score,
    timeLeft,
    gameStarted,
    gameOver,
    streak,
    highScore,
    handleStartGame,
    handleAnswer,
  };
};