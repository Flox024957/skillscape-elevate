import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { Game } from "@/types/games";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface GameCardProps extends Game {
  onClick?: () => void;
}

type IconType = keyof typeof LucideIcons;

export const GameCard = ({ title, description, players, icon, color, route, available = true }: GameCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const IconComponent = icon ? (LucideIcons[icon as IconType] as React.ComponentType<LucideProps>) : null;

  const handleClick = () => {
    if (!available) {
      toast({
        title: "Jeu non disponible",
        description: "Ce jeu sera disponible lors d'une prochaine mise à jour",
        variant: "default",
      });
      return;
    }
    
    if (route) {
      try {
        navigate(route);
      } catch (error) {
        console.error("Navigation error:", error);
        toast({
          title: "Erreur",
          description: "Impossible de lancer le jeu pour le moment",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: available ? 1.02 : 1 }}
      whileTap={{ scale: available ? 0.98 : 1 }}
      className={`relative overflow-hidden rounded-xl border bg-card p-6 shadow-lg transition-colors ${
        available ? 'hover:bg-accent/10 cursor-pointer' : 'opacity-50 cursor-not-allowed'
      }`}
      style={{ borderColor: color + '20' }}
      onClick={handleClick}
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