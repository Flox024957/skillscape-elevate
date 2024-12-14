import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
}

export const StartScreen = ({ onStart, highScore }: StartScreenProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card rounded-xl p-8 shadow-lg text-center space-y-6"
    >
      <div className="space-y-4">
        <Brain className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Flash Cards Sprint</h2>
        <p className="text-muted-foreground">
          Testez votre mémoire et votre rapidité ! Mémorisez les cartes et
          répondez correctement pour marquer des points.
        </p>
        
        {highScore > 0 && (
          <p className="text-sm text-primary">
            Record personnel : {highScore} points
          </p>
        )}
      </div>

      <Button onClick={onStart} size="lg" className="w-full sm:w-auto">
        Commencer
      </Button>
    </motion.div>
  );
};