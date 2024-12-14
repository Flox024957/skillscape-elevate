import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface GameScoreProps {
  score: number;
  position: number;
  totalPlayers: number;
}

export const GameScore = ({ score, position, totalPlayers }: GameScoreProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-lg"
    >
      <Trophy className="w-8 h-8 text-yellow-500" />
      <div>
        <p className="text-lg font-semibold">Score: {score}</p>
        <p className="text-sm text-muted-foreground">
          Position: {position}/{totalPlayers}
        </p>
      </div>
    </motion.div>
  );
};