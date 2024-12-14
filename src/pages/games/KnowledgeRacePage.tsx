import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Brain, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const KnowledgeRacePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleStart = () => {
    setIsPlaying(true);
    toast({
      title: "La course commence !",
      description: "Répondez aux questions le plus rapidement possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
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
            >
              <Trophy className="w-12 h-12 text-primary animate-pulse" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
              Knowledge Race
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Testez vos connaissances dans une course contre la montre ! Répondez aux questions le plus rapidement possible pour gagner des points.
          </p>
        </motion.div>

        {/* Game Area */}
        {!isPlaying ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid md:grid-cols-2 gap-8 pt-8"
          >
            {/* Game Info */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Comment jouer</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Répondez à un maximum de questions</li>
                <li>• Le temps est limité</li>
                <li>• Soyez rapide et précis</li>
                <li>• Gagnez des points bonus pour les séries</li>
              </ul>
            </Card>

            {/* Timer Info */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Timer className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Mode de jeu</h2>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>• 60 secondes pour marquer un maximum de points</p>
                <p>• +10 points par bonne réponse</p>
                <p>• +5 points bonus par série de 3</p>
                <p>• -5 points par mauvaise réponse</p>
              </div>
            </Card>

            {/* Start Button */}
            <motion.div
              className="md:col-span-2 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleStart}
                size="lg"
                className="text-lg px-8 py-6"
              >
                Commencer la partie
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="pt-8">
            {/* Game components will go here */}
            <p className="text-center text-muted-foreground">
              Jeu en cours de développement...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeRacePage;