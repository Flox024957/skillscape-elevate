import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  Rocket, 
  Target, 
  Users,
  Brain,
  TrendingUp,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Apprentissage Personnalisé",
    description: "Des parcours adaptés à votre rythme et à vos objectifs",
    gradient: "from-[#9b87f5] to-[#8B5CF6]"
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Échangez et progressez avec des professionnels passionnés",
    gradient: "from-[#F97316] to-[#FB923C]"
  },
  {
    icon: Target,
    title: "Objectifs Clairs",
    description: "Suivez votre progression avec des indicateurs précis",
    gradient: "from-[#8B5CF6] to-[#A78BFA]"
  },
  {
    icon: Rocket,
    title: "Progression Rapide",
    description: "Des outils innovants pour accélérer votre apprentissage",
    gradient: "from-[#FB923C] to-[#FDBA74]"
  },
  {
    icon: TrendingUp,
    title: "Suivi Détaillé",
    description: "Visualisez votre évolution et vos réussites",
    gradient: "from-[#A78BFA] to-[#C4B5FD]"
  },
  {
    icon: Sparkles,
    title: "Contenu Premium",
    description: "Accédez à des ressources exclusives et de qualité",
    gradient: "from-[#FDBA74] to-[#FED7AA]"
  }
];

export const MarketingSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={cn(
      "py-12",
      isMobile ? "px-4" : "px-8"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className={cn(
          "font-bold mb-4",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-[#9b87f5] to-[#F97316]",
          isMobile ? "text-2xl" : "text-4xl"
        )}>
          Pourquoi Nous Choisir ?
        </h2>
        <p className={cn(
          "text-gray-300 max-w-2xl mx-auto",
          isMobile ? "text-sm" : "text-lg"
        )}>
          Découvrez tous les avantages qui font de notre plateforme 
          la solution idéale pour votre développement professionnel
        </p>
      </motion.div>

      <div className={cn(
        "grid gap-6",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"
      )}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              "bg-white/5 backdrop-blur-sm",
              "border border-white/10",
              "hover:border-white/20 transition-all duration-500",
              "p-6"
            )}
          >
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              "bg-gradient-to-br",
              feature.gradient,
              "opacity-10"
            )} />

            <feature.icon className={cn(
              "w-10 h-10 mb-4",
              "text-transparent bg-clip-text",
              `bg-gradient-to-r ${feature.gradient}`
            )} />
            
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            
            <p className="text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};