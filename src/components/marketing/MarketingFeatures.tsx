import { motion } from "framer-motion";
import { Mic, Brain, Users, Target, Rocket, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Mic className="w-8 h-8 text-[#0EA5E9]" />,
    title: "Apprentissage Audio",
    description: "Développez vos compétences à travers des contenus audio immersifs et engageants"
  },
  {
    icon: <Brain className="w-8 h-8 text-[#8B5CF6]" />,
    title: "IA Personnalisée",
    description: "Bénéficiez de recommandations personnalisées pour optimiser votre apprentissage"
  },
  {
    icon: <Users className="w-8 h-8 text-[#F97316]" />,
    title: "Communauté Active",
    description: "Rejoignez une communauté de professionnels partageant vos ambitions"
  },
  {
    icon: <Target className="w-8 h-8 text-[#0EA5E9]" />,
    title: "Objectifs Clairs",
    description: "Fixez et atteignez vos objectifs professionnels étape par étape"
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#8B5CF6]" />,
    title: "Progression Rapide",
    description: "Accélérez votre développement grâce à nos outils innovants"
  },
  {
    icon: <Star className="w-8 h-8 text-[#F97316]" />,
    title: "Récompenses",
    description: "Débloquez des badges et suivez votre progression"
  }
];

export const MarketingFeatures = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "text-center font-bold mb-12",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#F97316]",
          isMobile ? "text-2xl" : "text-4xl"
        )}
      >
        Fonctionnalités Principales
      </motion.h2>

      <div className={cn(
        "grid gap-8",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"
      )}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-xl relative overflow-hidden
                     bg-background/30 backdrop-blur-sm
                     border border-white/10 hover:border-white/20
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 
                          group-hover:from-white/10 group-hover:to-white/5 
                          transition-all duration-300" />
            
            <div className="relative z-10">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};