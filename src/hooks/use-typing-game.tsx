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
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const loadWords = useCallback(async () => {
    console.log("Loading words from skills...");
    const { data: skills, error } = await supabase
      .from("skills")
      .select("titre, resume, description")
      .limit(50);

    if (error) {
      console.error("Error loading words:", error);
      return;
    }

    if (skills) {
      const extractedWords = skills.flatMap(skill => {
        const allText = `${skill.titre} ${skill.resume} ${skill.description}`;
        const words = allText.split(/\s+/)
          .filter(word => word.length >= 3 && word.length <= 15)
          .map(word => word.toLowerCase())
          .filter(word => /^[a-zÀ-ÿ]+$/i.test(word));
        return words;
      });
      
      // Mélanger les mots
      const shuffledWords = extractedWords.sort(() => Math.random() - 0.5);
      setWords(shuffledWords);
      console.log("Words loaded:", shuffledWords.length);
    }
  }, []);

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
      console.log("High score loaded:", leaderboard[0].score);
    }
  }, []);

  useEffect(() => {
    loadWords();
    loadHighScore();
  }, [loadWords, loadHighScore]);

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
    setScore(0);
    setTimeLeft(60);
    setTypedChars(0);
    setCorrectChars(0);
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    setStreak(0);
    loadWords();
  }, [loadWords]);

  const endGame = useCallback(() => {
    console.log("Ending game...");
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
    const isCorrect = typedWord.toLowerCase() === currentWord.toLowerCase();

    if (isCorrect) {
      // Bonus de score basé sur la longueur du mot et le streak
      const baseScore = currentWord.length * 10;
      const streakBonus = Math.floor(streak / 3) * 5; // Bonus tous les 3 mots corrects
      const timeBonus = Math.floor(timeLeft / 10) * 2; // Bonus basé sur le temps restant
      const totalScore = baseScore + streakBonus + timeBonus;
      
      setScore(prev => prev + totalScore);
      setCorrectChars(prev => prev + currentWord.length);
      setCurrentWordIndex(prev => prev + 1);
      setStreak(prev => prev + 1);

      // Feedback visuel pour les bonus
      if (streakBonus > 0) {
        toast({
          title: `Combo x${Math.floor(streak / 3)}!`,
          description: `+${streakBonus} points bonus!`,
          duration: 1000,
        });
      }
    } else {
      setStreak(0); // Réinitialiser le streak en cas d'erreur
    }

    setTypedChars(prev => prev + currentWord.length);
  }, [gameState, currentWordIndex, words, streak, timeLeft, toast]);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft, endGame]);

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
    streak,
    startGame,
    endGame,
    handleTyping,
    isGameOver: gameState === "finished"
  };
};