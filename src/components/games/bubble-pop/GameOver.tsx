import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Home } from "lucide-react";

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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center space-y-8"
    >
      <h2 className="text-3xl font-bold">Partie terminée !</h2>

      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-primary/10 backdrop-blur-sm rounded-lg p-6"
        >
          <p className="text-lg font-medium text-primary mb-2">Score final</p>
          <p className="text-4xl font-bold text-primary">{score}</p>
        </motion.div>

        {isNewHighScore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary"
          >
            <Trophy className="w-5 h-5" />
            <p className="font-medium">Nouveau record !</p>
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Rejouer
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={onExit}
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          Menu
        </Button>
      </div>
    </motion.div>
  );
};