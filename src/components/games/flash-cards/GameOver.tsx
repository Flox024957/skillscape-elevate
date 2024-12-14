import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onExit: () => void;
}

export const GameOver = ({ score, highScore, onRestart, onExit }: GameOverProps) => {
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card rounded-xl p-8 shadow-lg text-center space-y-6"
    >
      <div className="space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Partie terminée !</h2>
        
        <div className="space-y-2">
          <p className="text-xl">Score final : {score}</p>
          {isNewHighScore && (
            <p className="text-primary font-medium">
              🎉 Nouveau record personnel !
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} className="w-full sm:w-auto">
          Rejouer
        </Button>
        <Button onClick={onExit} variant="outline" className="w-full sm:w-auto">
          Quitter
        </Button>
      </div>
    </motion.div>
  );
};