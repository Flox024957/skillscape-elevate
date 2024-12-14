import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type GameState = "waiting" | "playing" | "finished";

export const useTypingGame = () => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [typedChars, setTypedChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  const loadWords = useCallback(async () => {
    const { data: skills } = await supabase
      .from("skills")
      .select("titre, resume")
      .limit(50);

    if (skills) {
      const extractedWords = skills.flatMap(skill => {
        const words = [
          skill.titre,
          ...(skill.resume?.split(" ") || [])
        ].filter(word => word.length > 3);
        return words;
      });
      
      setWords(extractedWords);
    }
  }, []);

  const loadHighScore = useCallback(async () => {
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
    loadWords();
    loadHighScore();
  }, [loadWords, loadHighScore]);

  const updateLeaderboard = async (finalScore: number) => {
    const { data: existingScore } = await supabase
      .from("game_leaderboards")
      .select("score")
      .eq("game_type", "typing_race")
      .eq("user_id", supabase.auth.getUser())
      .single();

    if (!existingScore || finalScore > existingScore.score) {
      const { error } = await supabase
        .from("game_leaderboards")
        .upsert({
          game_type: "typing_race",
          user_id: (await supabase.auth.getUser()).data.user?.id,
          score: finalScore,
          games_played: 1,
        });

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder le score",
          variant: "destructive",
        });
      }
    }
  };

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(60);
    setTypedChars(0);
    setCorrectChars(0);
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    loadWords();
  }, [loadWords]);

  const endGame = useCallback(() => {
    setGameState("finished");
    updateLeaderboard(score);
  }, [score]);

  const calculateWPM = useCallback(() => {
    if (!startTime) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // en minutes
    return Math.round((typedChars / 5) / timeElapsed);
  }, [startTime, typedChars]);

  const handleTyping = useCallback((typedWord: string) => {
    if (gameState !== "playing" || currentWordIndex >= words.length) return;

    const currentWord = words[currentWordIndex];
    const isCorrect = typedWord === currentWord;

    if (isCorrect) {
      setScore(prev => prev + (currentWord.length * 10));
      setCorrectChars(prev => prev + currentWord.length);
      setCurrentWordIndex(prev => prev + 1);
    }

    setTypedChars(prev => prev + currentWord.length);
  }, [gameState, currentWordIndex, words]);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  const accuracy = typedChars > 0 
    ? Math.round((correctChars / typedChars) * 100) 
    : 0;

  const wpm = calculateWPM();

  return {
    gameState,
    currentWord: words[currentWordIndex] || "",
    score,
    timeLeft,
    accuracy,
    wpm,
    highScore,
    startGame,
    endGame,
    handleTyping,
    isGameOver: gameState === "finished"
  };
};