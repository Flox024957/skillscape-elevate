import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SpeedLearningPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "finished">("waiting");

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border/50 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Timer className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Comment jouer</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Répondez rapidement aux questions</li>
                <li>• Gagnez des points pour chaque bonne réponse</li>
                <li>• Le plus rapide avec les bonnes réponses gagne</li>
                <li>• Durée de la partie : 5 minutes</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-card border border-border/50 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Classement</h2>
              </div>
              <div className="text-muted-foreground">
                Le classement sera disponible bientôt...
              </div>
            </motion.div>
          </div>

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
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedLearningPage;