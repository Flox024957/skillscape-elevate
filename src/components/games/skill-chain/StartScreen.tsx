import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "lucide-react";
import Tutorial from "./Tutorial";
import { Leaderboard } from "./Leaderboard";

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <Link className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Skill Chain</h1>
            <p className="text-xl text-muted-foreground">
              Créez des chaînes de compétences et marquez des points !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <Button
              size="lg"
              className="w-full text-lg"
              onClick={() => setShowTutorial(true)}
            >
              Tutoriel
            </Button>
            <Button
              size="lg"
              className="w-full text-lg"
              onClick={onStart}
            >
              Jouer
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <Leaderboard />
            </Card>
          </motion.div>
        </div>
      </div>

      {showTutorial && (
        <Tutorial onClose={() => setShowTutorial(false)} />
      )}
    </div>
  );
};