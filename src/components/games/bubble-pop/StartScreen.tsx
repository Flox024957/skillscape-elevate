import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Gamepad2 } from "lucide-react";

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
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/50 to-primary-foreground/50 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Gamepad2 className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground"
        >
          Bubble Pop Challenge
        </motion.h1>
      </div>
      
      <div className="space-y-4">
        <p className="text-xl text-muted-foreground">
          Éclatez les bulles en répondant correctement aux questions sur les compétences !
        </p>
        
        {highScore > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-primary"
          >
            <Trophy className="w-5 h-5" />
            <p className="font-medium">Meilleur score : {highScore}</p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-white/10">
          <h2 className="text-xl font-semibold">Comment jouer</h2>
          <ul className="text-muted-foreground space-y-2 text-left">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Des bulles apparaissent avec des questions sur les compétences
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Cliquez sur les bulles pour les éclater et marquer des points
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Plus vous répondez vite, plus vous marquez de points
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Le jeu dure 60 secondes
            </li>
          </ul>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-opacity"
        >
          Commencer
        </Button>
      </motion.div>
    </motion.div>
  );
};