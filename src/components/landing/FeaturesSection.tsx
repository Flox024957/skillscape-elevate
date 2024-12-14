import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Développement Personnel Actionnable",
    description: "Des actions concrètes extraites des meilleurs livres de développement personnel",
    icon: "✨",
    color: "from-[#0C4A6E] to-[#0369A1]"
  },
  {
    title: "Objectifs Transformationnels",
    description: "Définissez et atteignez vos objectifs de vie étape par étape",
    icon: "🎯",
    color: "from-[#8B5CF6] to-[#D946EF]"
  },
  {
    title: "Communauté Inspirante",
    description: "Échangez avec des personnes qui passent à l'action pour changer leur vie",
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
            staggerChildren: 0.2
          }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </motion.div>
  );
};

export default FeaturesSection;