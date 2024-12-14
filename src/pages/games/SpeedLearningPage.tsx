import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { GameContainer } from "@/components/games/speed-learning/GameContainer";

const SpeedLearningPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="p-3 bg-primary/20 rounded-xl backdrop-blur-sm"
            >
              <Brain className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-primary">
                Speed Learning Battle
              </h1>
              <p className="text-xl text-muted-foreground">
                Testez vos connaissances en développement web !
              </p>
            </div>
          </div>

          <GameContainer />
        </motion.div>
      </div>
    </div>
  );
};

export default SpeedLearningPage;