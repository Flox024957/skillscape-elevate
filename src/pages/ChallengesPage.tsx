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
    if (route === "/games/speed-learning" || route === "/games/typing-race") {
      navigate(route);
    } else {
      toast({
        title: "Bientôt disponible !",
        description: "Ce jeu sera disponible dans une prochaine mise à jour.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6 space-y-12">
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
                delay: 0.2 
              }}
            >
              <Trophy className="w-12 h-12 text-primary animate-pulse" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground"
            >
              Défis Interactifs
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Affrontez d'autres apprenants dans des jeux éducatifs et collaboratifs !
          </motion.p>

          <div className="space-y-16">
            {["speed", "construction", "collaborative"].map((type, index) => (
              <GameSection
                key={type}
                type={type as "speed" | "construction" | "collaborative"}
                games={games}
                onPlay={handleGameClick}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengesPage;