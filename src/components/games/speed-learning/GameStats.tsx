import { motion } from "framer-motion";
import { Trophy, Timer, Zap, Crown } from "lucide-react";

interface GameStatsProps {
  score: number;
  timeLeft: number;
  streak: number;
  highScore: number;
}

export const GameStats = ({ score, timeLeft, streak, highScore }: GameStatsProps) => {
  const isNewHighScore = score > highScore;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div 
        className="flex items-center gap-2 bg-background/50 p-3 rounded-lg"
        animate={{ scale: score > 0 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Trophy className="w-5 h-5 text-primary" />
        <div>
          <span className="text-sm text-muted-foreground">Score</span>
          <p className="text-xl font-semibold">
            {score}
            {isNewHighScore && (
              <Crown className="w-4 h-4 text-yellow-500 inline-block ml-2" />
            )}
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2 bg-background/50 p-3 rounded-lg"
        animate={{ 
          scale: timeLeft <= 10 ? [1, 1.05, 1] : 1,
          borderColor: timeLeft <= 10 ? ["#ef4444", "transparent"] : "transparent"
        }}
        transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
      >
        <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-primary'}`} />
        <div>
          <span className="text-sm text-muted-foreground">Temps</span>
          <p className="text-xl font-semibold">{timeLeft}s</p>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-2 bg-background/50 p-3 rounded-lg"
        animate={{ 
          scale: streak > 0 ? [1, 1.05, 1] : 1,
          backgroundColor: streak >= 5 ? ["rgba(234, 179, 8, 0.2)", "rgba(234, 179, 8, 0)"] : "transparent"
        }}
        transition={{ duration: 0.3 }}
      >
        <Zap className={`w-5 h-5 ${streak > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
        <div>
          <span className="text-sm text-muted-foreground">Série</span>
          <p className="text-xl font-semibold">{streak}</p>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <div>
          <span className="text-sm text-muted-foreground">Record</span>
          <p className="text-xl font-semibold">{Math.max(highScore, score)}</p>
        </div>
      </div>
    </div>
  );
};