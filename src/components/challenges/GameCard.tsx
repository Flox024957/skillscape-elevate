import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: keyof typeof LucideIcons;
  color: string;
  route: string;
}

export const GameCard = ({
  title,
  description,
  players,
  icon,
  color,
  route,
}: GameCardProps) => {
  const navigate = useNavigate();
  const IconComponent = LucideIcons[icon] as LucideIcon;

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.2 },
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300",
        color
      )}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative p-8 space-y-4">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-white/20 rounded-xl backdrop-blur-sm ring-1 ring-white/30"
          >
            {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
          </motion.div>
          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-white/90 line-clamp-2 text-lg">
          {description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-white/90 bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm ring-1 ring-white/20">
            {players}
          </span>
          <Button
            onClick={() => navigate(route)}
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 text-lg font-medium"
          >
            Jouer
          </Button>
        </div>
      </div>
    </motion.div>
  );
};