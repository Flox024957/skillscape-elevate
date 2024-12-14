import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ChallengesPage = () => {
  const { toast } = useToast();

  const handleJoinChallenge = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Les défis seront bientôt disponibles !",
    });
  };

  return (
    <div className="min-h-screen bg-futuristic-black">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-neon-purple" />
            <h1 className="text-3xl font-bold neon-text">Défis</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6"
              >
                <h3 className="text-xl font-semibold neon-text mb-2">Défi #{i}</h3>
                <p className="text-muted-foreground mb-4">
                  Exemple de défi à venir...
                </p>
                <Button onClick={handleJoinChallenge} className="futuristic-button">
                  Participer au défi
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengesPage;