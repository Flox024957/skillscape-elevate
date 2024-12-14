import { motion } from "framer-motion";
import { Timer, Target, Zap } from "lucide-react";

interface GameStatsProps {
  score: number;
  timeLeft: number;
  accuracy: number;
  wpm: number;
}

export const GameStats = ({ score, timeLeft, accuracy, wpm }: GameStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <div className="bg-card p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-medium">Score</span>
        </div>
        <span className="text-2xl font-bold">{score}</span>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Timer className="w-5 h-5" />
          <span className="font-medium">Temps</span>
        </div>
        <span className="text-2xl font-bold">{timeLeft}s</span>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Target className="w-5 h-5" />
          <span className="font-medium">Précision</span>
        </div>
        <span className="text-2xl font-bold">{accuracy}%</span>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-medium">MPM</span>
        </div>
        <span className="text-2xl font-bold">{wpm}</span>
      </div>
    </motion.div>
  );
};