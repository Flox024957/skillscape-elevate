import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Développement Personnel Actionnable",
    description: "Des actions concrètes extraites des meilleurs livres de développement personnel pour des résultats immédiats",
    icon: "✨",
    color: "from-[#0C4A6E] to-[#0369A1]"
  },
  {
    title: "Objectifs Transformationnels",
    description: "Une méthode éprouvée pour définir et atteindre vos objectifs de vie étape par étape",
    icon: "🎯",
    color: "from-[#8B5CF6] to-[#D946EF]"
  },
  {
    title: "Communauté Inspirante",
    description: "Rejoignez des personnes déterminées qui passent à l'action pour transformer leur vie",
    icon: "🤝",
    color: "from-[#F97316] to-[#FB923C]"
  }
];

const FeaturesSection = () => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </motion.div>
  );
};

export default FeaturesSection;