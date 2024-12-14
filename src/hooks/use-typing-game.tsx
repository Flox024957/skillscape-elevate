import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { GameState, GameStats } from "@/types/typing-game";
import { calculateScore, calculateWPM, calculateAccuracy } from "@/utils/typing-game-scoring";
import { loadWords } from "@/utils/typing-game-words";

export const useTypingGame = () => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    timeLeft: 60,
    typedChars: 0,
    correctChars: 0,
    streak: 0,
    startTime: null
  });
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  const loadHighScore = useCallback(async () => {
    console.log("Loading high score...");
    const { data: leaderboard } = await supabase
      .from("game_leaderboards")
      .select("score")
      .eq("game_type", "typing_race")
      .order("score", { ascending: false })
      .limit(1);

    if (leaderboard && leaderboard.length > 0) {
      setHighScore(leaderboard[0].score);
    }
  }, []);

  useEffect(() => {
    loadWords().then(setWords);
    loadHighScore();
  }, [loadHighScore]);

  const updateLeaderboard = async (finalScore: number) => {
    console.log("Updating leaderboard with score:", finalScore);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data: existingScore } = await supabase
      .from("game_leaderboards")
      .select("score")
      .eq("game_type", "typing_race")
      .eq("user_id", user.id)
      .single();

    if (!existingScore || finalScore > existingScore.score) {
      const { error } = await supabase
        .from("game_leaderboards")
        .upsert({
          game_type: "typing_race",
          user_id: user.id,
          score: finalScore,
          games_played: 1,
        });

      if (error) {
        console.error("Error updating leaderboard:", error);
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder le score",
          variant: "destructive",
        });
      } else {
        if (!existingScore) {
          toast({
            title: "Premier score !",
            description: `Vous avez marqué ${finalScore} points`,
          });
        } else if (finalScore > existingScore.score) {
          toast({
            title: "Nouveau record !",
            description: `Ancien record : ${existingScore.score} points`,
          });
        }
      }
    }
  };

  const startGame = useCallback(() => {
    console.log("Starting game...");
    setGameState("playing");
    setGameStats({
      score: 0,
      timeLeft: 60,
      typedChars: 0,
      correctChars: 0,
      streak: 0,
      startTime: Date.now()
    });
    setCurrentWordIndex(0);
    loadWords();
  }, []);

  const endGame = useCallback(() => {
    console.log("Ending game...");
    setGameState("finished");
    updateLeaderboard(gameStats.score);
  }, [gameStats.score]);

  const handleTyping = useCallback((typedWord: string) => {
    if (gameState !== "playing" || currentWordIndex >= words.length) return;

    const currentWord = words[currentWordIndex];
    const isCorrect = typedWord.toLowerCase() === currentWord.toLowerCase();

    if (isCorrect) {
      const { total: scoreIncrease } = calculateScore(
        currentWord.length,
        gameStats.streak,
        gameStats.timeLeft
      );
      
      setGameStats(prev => ({
        ...prev,
        score: prev.score + scoreIncrease,
        correctChars: prev.correctChars + currentWord.length,
        streak: prev.streak + 1
      }));
      
      setCurrentWordIndex(prev => prev + 1);

      if (Math.floor(gameStats.streak / 3) > Math.floor((gameStats.streak - 1) / 3)) {
        toast({
          title: `Combo x${Math.floor(gameStats.streak / 3)}!`,
          description: `+${Math.floor(gameStats.streak / 3) * 5} points bonus!`,
          duration: 1000,
        });
      }
    } else {
      setGameStats(prev => ({ ...prev, streak: 0 }));
    }

    setGameStats(prev => ({
      ...prev,
      typedChars: prev.typedChars + currentWord.length
    }));
  }, [gameState, currentWordIndex, words, gameStats.streak, gameStats.timeLeft, toast]);

  useEffect(() => {
    if (gameState === "playing" && gameStats.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameStats(prev => {
          if (prev.timeLeft <= 1) {
            endGame();
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, gameStats.timeLeft, endGame]);

  const wpm = calculateWPM(gameStats.typedChars, gameStats.startTime);
  const accuracy = calculateAccuracy(gameStats.typedChars, gameStats.correctChars);

  return {
    gameState,
    currentWord: words[currentWordIndex] || "",
    score: gameStats.score,
    timeLeft: gameStats.timeLeft,
    accuracy,
    wpm,
    highScore,
    streak: gameStats.streak,
    startGame,
    endGame,
    handleTyping,
    isGameOver: gameState === "finished"
  };
};