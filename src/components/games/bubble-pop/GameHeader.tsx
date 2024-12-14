import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Timer, Trophy } from "lucide-react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  onExit: () => void;
}

export const GameHeader = ({ score, timeLeft, isPlaying, onExit }: GameHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
        >
          <div className="flex items-center gap-2 text-primary mb-1">
            <Trophy className="w-4 h-4" />
            <p className="text-sm font-medium">Score</p>
          </div>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </motion.div>

        {isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
          >
            <div className="flex items-center gap-2 text-primary mb-1">
              <Timer className="w-4 h-4" />
              <p className="text-sm font-medium">Temps</p>
            </div>
            <p className="text-2xl font-bold text-primary">{timeLeft}s</p>
          </motion.div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onExit}
        className="hover:bg-destructive/20"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};