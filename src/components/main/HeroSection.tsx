import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { TodayEvents } from "./hero/TodayEvents";

const HeroSection = () => {
  const frameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="text-center mb-20 perspective-1000"
    >
      <HeroTitle />

      <motion.div 
        variants={frameVariants}
        whileHover="hover"
        className="w-full max-w-md mx-auto"
      >
        <TodayEvents />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;