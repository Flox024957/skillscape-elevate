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
      className="max-w-2xl mx-auto text-center space-y-8"
    >
      <h1 className="text-4xl font-bold">Bubble Pop Challenge</h1>
      
      <div className="space-y-4">
        <p className="text-xl text-muted-foreground">
          Éclatez les bulles en répondant correctement aux questions sur les compétences !
        </p>
        
        {highScore > 0 && (
          <div className="flex items-center justify-center gap-2 text-primary">
            <Trophy className="w-5 h-5" />
            <p className="font-medium">Meilleur score : {highScore}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Comment jouer</h2>
          <ul className="text-muted-foreground space-y-2 text-left">
            <li>• Des bulles apparaissent avec des questions sur les compétences</li>
            <li>• Cliquez sur les bulles pour les éclater et marquer des points</li>
            <li>• Plus vous répondez vite, plus vous marquez de points</li>
            <li>• Le jeu dure 60 secondes</li>
          </ul>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="text-lg px-8 py-6"
        >
          Commencer
        </Button>
      </div>
    </motion.div>
  );
};