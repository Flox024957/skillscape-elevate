import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GameSection } from "@/components/challenges/GameSection";
import { games } from "@/data/games";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGameClick = (route: string) => {
    toast({
      title: "Bientôt disponible !",
      description: "Ce jeu sera disponible dans une prochaine mise à jour.",
    });
    // navigate(route); // À décommenter quand les jeux seront implémentés
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20">
      <div className="container mx-auto p-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Défis Interactifs
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground">
            Affrontez d'autres apprenants dans des jeux éducatifs et collaboratifs !
          </p>

          {/* Sections de jeux */}
          {["speed", "construction", "collaborative"].map((type) => (
            <GameSection
              key={type}
              type={type as "speed" | "construction" | "collaborative"}
              games={games}
              onPlay={handleGameClick}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengesPage;