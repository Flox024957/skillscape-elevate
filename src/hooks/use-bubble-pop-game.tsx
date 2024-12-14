import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Bubble } from "@/types/bubble-pop";

const GAME_DURATION = 60;
const BUBBLE_SPAWN_INTERVAL = 2000;
const INITIAL_BUBBLES = 3;

export const useBubblePopGame = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const { toast } = useToast();

  const loadHighScore = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("game_leaderboards")
      .select("score")
      .eq("game_type", "bubble_pop")
      .eq("user_id", user.id)
      .order("score", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setHighScore(data[0].score);
    }
  };

  const generateBubble = useCallback(async (): Promise<Bubble> => {
    // Récupérer une compétence aléatoire avec sa catégorie
    const { data: skills } = await supabase
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
      `)
      .limit(1)
      .order("random()");

    if (!skills || skills.length === 0) {
      throw new Error("No skills found");
    }

    const skill = skills[0];
    const questionTypes = ["titre", "resume", "description", "action_concrete"] as const;
    const selectedType = questionTypes[Math.random() * questionTypes.length | 0];
    
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = Math.random() * (window.innerHeight - 200) + 100;
    
    // Générer une couleur basée sur la catégorie
    const categoryColors: { [key: string]: string } = {
      "Frontend": "hsl(330, 70%, 70%)", // Rose
      "Backend": "hsl(200, 70%, 70%)", // Bleu
      "Design": "hsl(150, 70%, 70%)", // Vert
      "DevOps": "hsl(270, 70%, 70%)", // Violet
      "Mobile": "hsl(30, 70%, 70%)", // Orange
    };
    
    const color = categoryColors[skill.categories?.name] || `hsl(${Math.random() * 360}, 70%, 70%)`;
    
    return {
      id: crypto.randomUUID(),
      x,
      y,
      size: Math.random() * 20 + 60,
      speed: Math.random() * 1 + 0.5,
      skill,
      questionType: selectedType,
      color,
    };
  }, []);

  const spawnBubbles = useCallback(async (count: number) => {
    const newBubbles = await Promise.all(
      Array(count).fill(null).map(generateBubble)
    );
    setBubbles(prev => [...prev, ...newBubbles]);
  }, [generateBubble]);

  const handleBubblePop = (bubbleId: string) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setScore(prev => prev + 10);
    
    // Spawn a new bubble to replace the popped one
    spawnBubbles(1);
  };

  const startGame = async () => {
    try {
      await spawnBubbles(INITIAL_BUBBLES);
      setHasStarted(true);
      setIsPlaying(true);
      setIsGameOver(false);
      setScore(0);
      setTimeLeft(GAME_DURATION);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le jeu. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const resetGame = () => {
    setBubbles([]);
    setHasStarted(false);
    setIsPlaying(false);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
  };

  const updateLeaderboard = async (finalScore: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: existingEntry } = await supabase
      .from("game_leaderboards")
      .select("*")
      .eq("game_type", "bubble_pop")
      .eq("user_id", user.id)
      .limit(1);

    if (existingEntry && existingEntry.length > 0) {
      if (finalScore > existingEntry[0].score) {
        await supabase
          .from("game_leaderboards")
          .update({
            score: finalScore,
            games_played: existingEntry[0].games_played + 1,
          })
          .eq("id", existingEntry[0].id);
      }
    } else {
      await supabase
        .from("game_leaderboards")
        .insert({
          game_type: "bubble_pop",
          user_id: user.id,
          score: finalScore,
          games_played: 1,
        });
    }

    await loadHighScore();
  };

  // Effet pour charger le meilleur score au montage
  useEffect(() => {
    loadHighScore();
  }, []);

  // Effet pour le timer du jeu
  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
      updateLeaderboard(score);
      toast({
        title: "Temps écoulé !",
        description: `Score final : ${score} points`,
      });
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  // Effet pour générer les bulles
  useEffect(() => {
    let spawnTimer: number;
    if (isPlaying) {
      spawnTimer = window.setInterval(() => {
        spawnBubbles(1);
      }, BUBBLE_SPAWN_INTERVAL);
    }
    return () => clearInterval(spawnTimer);
  }, [isPlaying, spawnBubbles]);

  return {
    hasStarted,
    isPlaying,
    isGameOver,
    score,
    highScore,
    timeLeft,
    bubbles,
    startGame,
    resetGame,
    handleBubblePop,
  };
};
