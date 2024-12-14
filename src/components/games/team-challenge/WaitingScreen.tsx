import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaitingScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

export const WaitingScreen = ({ onStart, isLoading }: WaitingScreenProps) => {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Prêt à relever le défi ?</h2>
      <div className="flex flex-col items-center gap-4">
        <Trophy className="w-16 h-16 text-primary animate-pulse" />
        <Button
          size="lg"
          onClick={onStart}
          className="text-lg px-8"
          disabled={isLoading}
        >
          Commencer le défi
        </Button>
      </div>
    </div>
  );
};