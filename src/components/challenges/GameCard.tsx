import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { Game } from "@/types/games";
import { useNavigate } from "react-router-dom";

interface GameCardProps extends Game {
  onClick?: () => void;
}

type IconType = keyof typeof LucideIcons;

export const GameCard = ({ title, description, players, icon, color, route }: GameCardProps) => {
  const navigate = useNavigate();
  const IconComponent = icon ? LucideIcons[icon as IconType] : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-lg transition-colors hover:bg-accent/10 cursor-pointer"
      style={{ borderColor: color + '20' }}
      onClick={() => navigate(route)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{players}</p>
        </div>
        {IconComponent && (
          <div
            className="rounded-full p-2"
            style={{ backgroundColor: color + '10' }}
          >
            <IconComponent className="h-6 w-6" style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};