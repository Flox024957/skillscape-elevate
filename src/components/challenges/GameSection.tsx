import { motion } from "framer-motion";
import { GameCard } from "./GameCard";
import type { Game } from "@/types/games";

interface GameSectionProps {
  type: "speed" | "construction" | "collaborative";
  games: Game[];
}

export const GameSection = ({ type, games }: GameSectionProps) => {
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
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground"
      >
        {getTitle()}
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {games
          .filter((game) => game.type === type)
          .map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
      </motion.div>
    </motion.div>
  );
};