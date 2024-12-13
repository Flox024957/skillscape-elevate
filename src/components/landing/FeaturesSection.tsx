import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Développement Personnel",
    description: "Suivez votre progression et développez vos compétences à votre rythme",
    icon: "✨",
    color: "from-[#0EA5E9] to-[#33C3F0]"
  },
  {
    title: "Objectifs Clairs",
    description: "Définissez et atteignez vos objectifs professionnels étape par étape",
    icon: "🎯",
    color: "from-[#F97316] to-[#FEC6A1]"
  },
  {
    title: "Communauté Active",
    description: "Partagez et apprenez avec une communauté de professionnels motivés",
    icon: "🤝",
    color: "from-[#9b87f5] to-[#8B5CF6]"
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