import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <h2 className="text-2xl font-semibold">
        Prêt à tester vos connaissances ?
      </h2>
      <p className="text-muted-foreground">
        Répondez à un maximum de questions en 30 secondes !
      </p>
      <Button size="lg" onClick={onStart} className="gap-2">
        <Trophy className="w-5 h-5" />
        Commencer le défi
      </Button>
    </motion.div>
  );
};