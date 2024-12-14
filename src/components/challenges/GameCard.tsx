import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  onPlay: (route: string) => void;
}

export const GameCard = ({
  title,
  description,
  players,
  icon,
  color,
  route,
  onPlay,
}: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br",
        color
      )}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-white/90">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">
            {players}
          </span>
          <Button
            onClick={() => onPlay(route)}
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          >
            Jouer
          </Button>
        </div>
      </div>
    </motion.div>
  );
};