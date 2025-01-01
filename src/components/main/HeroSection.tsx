import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { TodayEvents } from "./hero/TodayEvents";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const isMobile = useIsMobile();
  
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
      className={cn(
        "text-center",
        isMobile ? "mb-8 pt-4" : "mb-20",
        "perspective-1000"
      )}
    >
      <HeroTitle />

      <motion.div 
        variants={frameVariants}
        whileHover="hover"
        className={cn(
          "w-full max-w-md mx-auto",
          isMobile && "px-2"
        )}
      >
        <TodayEvents />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;