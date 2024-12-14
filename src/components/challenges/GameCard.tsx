import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: keyof typeof LucideIcons;
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
  const IconComponent = LucideIcons[icon] as LucideIcon;

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow duration-300",
        color
      )}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
            {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-white/90 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {players}
          </span>
          <Button
            onClick={() => onPlay(route)}
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Jouer
          </Button>
        </div>
      </div>
    </motion.div>
  );
};