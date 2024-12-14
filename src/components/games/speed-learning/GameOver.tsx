import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <h2 className="text-2xl font-semibold">Partie terminée !</h2>
      <p className="text-xl">Score final : {score} points</p>
      <Button size="lg" onClick={onRestart} className="gap-2">
        <Trophy className="w-5 h-5" />
        Rejouer
      </Button>
    </motion.div>
  );
};