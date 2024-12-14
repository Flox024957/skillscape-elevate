import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GameQuestion } from "@/components/games/speed-learning/GameQuestion";
import { GameScore } from "@/components/games/speed-learning/GameScore";

const GAME_DURATION = 300; // 5 minutes en secondes

const SpeedLearningPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "finished">("waiting");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [""],
    correctAnswer: ""
  });

  useEffect(() => {
    const checkGameSession = async () => {
      try {
        const { data: session } = await supabase
          .from("game_sessions")
          .select("*")
          .eq("game_type", "speed_learning")
          .eq("status", "waiting")
          .single();

        if (session) {
          toast({
            title: "Session trouvée !",
            description: "Vous allez rejoindre une partie existante.",
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking game session:", error);
        setIsLoading(false);
      }
    };

    checkGameSession();
  }, [toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleCreateGame = async () => {
    try {
      const { data: newSession, error } = await supabase
        .from("game_sessions")
        .insert([
          {
            game_type: "speed_learning",
            status: "waiting",
            max_players: 4,
            current_players: 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Partie créée !",
        description: "En attente d'autres joueurs...",
      });

      setGameState("waiting");
    } catch (error) {
      console.error("Error creating game:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la partie.",
        variant: "destructive",
      });
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 100);
      toast({
        title: "Bonne réponse !",
        description: "+100 points",
      });
    }
    // Charger la prochaine question...
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="p-3 bg-primary/20 rounded-xl backdrop-blur-sm"
            >
              <Brain className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-primary">
                Speed Learning Battle
              </h1>
              <p className="text-xl text-muted-foreground">
                Affrontez d'autres joueurs dans une bataille de connaissances rapide !
              </p>
            </div>
          </div>

          {gameState === "playing" && (
            <>
              <GameScore score={score} position={1} totalPlayers={4} />
              <GameQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                onAnswer={handleAnswer}
                timeLeft={timeLeft}
              />
            </>
          )}

          {gameState === "waiting" && (
            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={handleCreateGame}
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Créer une partie"}
              </Button>
            </div>
          )}

          {gameState === "finished" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
              <h2 className="text-3xl font-bold">Partie terminée !</h2>
              <p className="text-xl">Score final : {score}</p>
              <Button
                size="lg"
                onClick={() => navigate("/challenges")}
              >
                Retour aux défis
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedLearningPage;