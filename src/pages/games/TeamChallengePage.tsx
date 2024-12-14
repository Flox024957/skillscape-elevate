import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface TeamChallengeState {
  status: "waiting" | "playing" | "finished";
  currentTeam: number;
  scores: Record<number, number>;
}

const TeamChallengePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<TeamChallengeState>({
    status: "waiting",
    currentTeam: 1,
    scores: { 1: 0, 2: 0 }
  });

  // Charger les questions depuis Supabase
  const { data: questions, isLoading } = useQuery({
    queryKey: ["team-challenge-questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("game_questions")
        .select("*")
        .eq("category", "team_challenge")
        .order("difficulty", { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const startGame = () => {
    setGameState(prev => ({ ...prev, status: "playing" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6 space-y-8">
        {/* En-tête du jeu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-3 bg-primary/10 rounded-xl"
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
              Team Challenge
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Affrontez d'autres équipes dans une série de défis passionnants ! Collaborez, réfléchissez et soyez les plus rapides.
          </p>
        </motion.div>

        {/* Zone de jeu principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-8 shadow-lg space-y-6"
        >
          {gameState.status === "waiting" ? (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-semibold">Prêt à relever le défi ?</h2>
              <div className="flex flex-col items-center gap-4">
                <Trophy className="w-16 h-16 text-primary animate-pulse" />
                <Button
                  size="lg"
                  onClick={startGame}
                  className="text-lg px-8"
                  disabled={isLoading}
                >
                  Commencer le défi
                </Button>
              </div>
            </div>
          ) : gameState.status === "playing" ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Équipe {gameState.currentTeam}</h3>
                  <p className="text-muted-foreground">C'est votre tour !</p>
                </div>
                <div className="flex gap-4">
                  {Object.entries(gameState.scores).map(([team, score]) => (
                    <div
                      key={team}
                      className="bg-primary/10 px-4 py-2 rounded-lg"
                    >
                      <p className="text-sm font-medium">Équipe {team}</p>
                      <p className="text-2xl font-bold">{score}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Zone des questions/défis */}
              <div className="space-y-4">
                {/* À implémenter : affichage des questions et gestion des réponses */}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Partie terminée !</h2>
              <Trophy className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-4">
                <p className="text-xl">
                  L'équipe {
                    Object.entries(gameState.scores).reduce((a, b) => 
                      gameState.scores[Number(a)] > gameState.scores[Number(b)] ? a : b
                    )
                  } remporte la victoire !
                </p>
                <Button
                  onClick={() => navigate("/challenges")}
                  variant="outline"
                  size="lg"
                >
                  Retour aux défis
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamChallengePage;