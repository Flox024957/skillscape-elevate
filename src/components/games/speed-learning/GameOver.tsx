import { motion } from "framer-motion";
import { Trophy, ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOver = ({ score, highScore, onRestart }: GameOverProps) => {
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <h2 className="text-2xl font-semibold">Partie terminée !</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-6 h-6 text-primary" />
          <p className="text-xl">Score final : {score} points</p>
        </div>

        {isNewHighScore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-yellow-500"
          >
            <Crown className="w-5 h-5" />
            <p>Nouveau record !</p>
          </motion.div>
        )}

        <p className="text-muted-foreground">
          Record actuel : {Math.max(highScore, score)} points
        </p>
      </div>

      <Button size="lg" onClick={onRestart} className="gap-2">
        <Trophy className="w-5 h-5" />
        Rejouer
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};