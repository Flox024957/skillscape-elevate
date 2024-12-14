import { motion } from "framer-motion";
import { GameCard } from "./GameCard";
import type { Game } from "@/types/games";

interface GameSectionProps {
  type: "speed" | "construction" | "collaborative";
  games: Game[];
  onPlay: (route: string) => void;
}

export const GameSection = ({ type, games, onPlay }: GameSectionProps) => {
  const getTitle = () => {
    switch (type) {
      case "speed":
        return "Jeux de Rapidité";
      case "construction":
        return "Jeux de Construction";
      case "collaborative":
        return "Jeux Collaboratifs";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold capitalize">
        {getTitle()}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games
          .filter((game) => game.type === type)
          .map((game) => (
            <GameCard key={game.id} {...game} onPlay={onPlay} />
          ))}
      </div>
    </div>
  );
};