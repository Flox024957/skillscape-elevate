import { motion } from "framer-motion";
import { Timer, Target, Zap, Flame } from "lucide-react";

interface GameStatsProps {
  score: number;
  timeLeft: number;
  accuracy: number;
  wpm: number;
  streak?: number;
}

export const GameStats = ({ score, timeLeft, accuracy, wpm, streak = 0 }: GameStatsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-5 gap-4"
    >
      <motion.div 
        variants={item}
        className="bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-medium">Score</span>
        </div>
        <motion.span 
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold"
        >
          {score}
        </motion.span>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary mb-2">
          <Timer className="w-5 h-5" />
          <span className="font-medium">Temps</span>
        </div>
        <motion.span 
          key={timeLeft}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={cn(
            "text-2xl font-bold",
            timeLeft <= 10 && "text-red-500 animate-pulse"
          )}
        >
          {timeLeft}s
        </motion.span>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary mb-2">
          <Target className="w-5 h-5" />
          <span className="font-medium">Précision</span>
        </div>
        <motion.span 
          key={accuracy}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold"
        >
          {accuracy}%
        </motion.span>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-medium">MPM</span>
        </div>
        <motion.span 
          key={wpm}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold"
        >
          {wpm}
        </motion.span>
      </motion.div>

      <motion.div 
        variants={item}
        className="bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary mb-2">
          <Flame className={cn(
            "w-5 h-5",
            streak >= 3 && "animate-pulse text-orange-500"
          )} />
          <span className="font-medium">Combo</span>
        </div>
        <motion.span 
          key={streak}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={cn(
            "text-2xl font-bold",
            streak >= 3 && "text-orange-500"
          )}
        >
          x{Math.floor(streak / 3)}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};