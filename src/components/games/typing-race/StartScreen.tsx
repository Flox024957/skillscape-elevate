import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
}

export const StartScreen = ({ onStart, highScore }: StartScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Prêt à taper ?</h2>
        <p className="text-muted-foreground text-lg">
          Testez votre vitesse de frappe avec des termes techniques !
        </p>
      </div>

      {highScore > 0 && (
        <div className="flex items-center justify-center gap-2 text-primary">
          <Trophy className="w-5 h-5" />
          <span className="font-medium">Meilleur score : {highScore}</span>
        </div>
      )}

      <Button
        size="lg"
        onClick={onStart}
        className="text-lg px-8"
      >
        Commencer
      </Button>
    </motion.div>
  );
};