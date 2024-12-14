import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Zap, RotateCcw, Home } from "lucide-react";

interface GameOverProps {
  score: number;
  accuracy: number;
  wpm: number;
  highScore: number;
  onRestart: () => void;
  onExit: () => void;
}

export const GameOver = ({
  score,
  accuracy,
  wpm,
  highScore,
  onRestart,
  onExit
}: GameOverProps) => {
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <h2 className="text-3xl font-bold">Partie terminée !</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-4" />
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-muted-foreground">Score final</div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Target className="w-8 h-8 text-primary mx-auto mb-4" />
          <div className="text-2xl font-bold">{accuracy}%</div>
          <div className="text-muted-foreground">Précision</div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
          <div className="text-2xl font-bold">{wpm}</div>
          <div className="text-muted-foreground">Mots par minute</div>
        </div>
      </div>

      {isNewHighScore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-medium"
        >
          🎉 Nouveau record !
        </motion.div>
      )}

      <div className="flex justify-center gap-4">
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
          variant="default"
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