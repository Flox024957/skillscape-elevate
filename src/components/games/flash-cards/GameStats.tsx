import { motion } from "framer-motion";
import { Timer, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameStatsProps {
  score: number;
  timeLeft: number;
  streak: number;
  highScore: number;
}

export const GameStats = ({ score, timeLeft, streak, highScore }: GameStatsProps) => {
  const isTimeRunningOut = timeLeft <= 10;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-primary/10 rounded-xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Score</span>
        </div>
        <p className="text-2xl font-bold mt-1">{score}</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "bg-primary/10 rounded-xl p-4 backdrop-blur-sm",
          isTimeRunningOut && "animate-pulse bg-red-500/20"
        )}
      >
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Temps</span>
        </div>
        <p className="text-2xl font-bold mt-1">{timeLeft}s</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-primary/10 rounded-xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Série</span>
        </div>
        <p className="text-2xl font-bold mt-1">{streak}</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-primary/10 rounded-xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Record</span>
        </div>
        <p className="text-2xl font-bold mt-1">{highScore}</p>
      </motion.div>
    </div>
  );
};