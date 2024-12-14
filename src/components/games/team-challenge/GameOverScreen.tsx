import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GameOverScreenProps {
  scores: Record<number, number>;
}

export const GameOverScreen = ({ scores }: GameOverScreenProps) => {
  const navigate = useNavigate();
  const winningTeam = Object.entries(scores).reduce((a, b) => 
    scores[Number(a)] > scores[Number(b)] ? a : b
  );

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold">Partie terminée !</h2>
      <Trophy className="w-16 h-16 text-primary mx-auto" />
      <div className="space-y-4">
        <p className="text-xl">
          L'équipe {winningTeam} remporte la victoire !
        </p>
        <Button
          onClick={() => navigate("/challenges")}
          variant="outline"
          size="lg"
        >
          Retour aux défis
        </Button>
      </div>
    </div>
  );
};