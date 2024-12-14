import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 text-yellow-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold"
          >
            Partie terminée !
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            Score final : {score} points
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              onClick={onRestart}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            >
              Rejouer
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};