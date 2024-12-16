import { motion } from "framer-motion";
import { Sparkles, Target, Users, Rocket, Brain, Star } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Développement Personnel",
    description: "Suivez votre progression et développez vos compétences à votre rythme"
  },
  {
    icon: <Target className="w-6 h-6 text-orange-400" />,
    title: "Objectifs Clairs",
    description: "Définissez et atteignez vos objectifs professionnels étape par étape"
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Communauté Active",
    description: "Partagez et apprenez avec une communauté de professionnels motivés"
  },
  {
    icon: <Rocket className="w-6 h-6 text-pink-400" />,
    title: "Progression Rapide",
    description: "Accélérez votre apprentissage grâce à nos outils innovants"
  },
  {
    icon: <Brain className="w-6 h-6 text-green-400" />,
    title: "Apprentissage Intelligent",
    description: "Utilisez l'IA pour optimiser votre parcours d'apprentissage"
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    title: "Récompenses",
    description: "Gagnez des badges et débloquez des achievements en progressant"
  }
];

export const FeaturesSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className={cn(
        "grid gap-4 md:gap-8 mb-16 px-4",
        isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
      )}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          index={index}
        />
      ))}
    </motion.div>
  );
};
