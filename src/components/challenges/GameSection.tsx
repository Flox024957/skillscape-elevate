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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        {getTitle()}
      </h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {games
          .filter((game) => game.type === type)
          .map((game) => (
            <GameCard key={game.id} {...game} onPlay={onPlay} />
          ))}
      </motion.div>
    </motion.div>
  );
};