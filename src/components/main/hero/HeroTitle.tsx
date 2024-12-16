import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const HeroTitle = () => {
  const isMobile = useIsMobile();
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.h1 
        variants={textVariants}
        className={cn(
          "font-bold mb-6 text-white",
          "drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]",
          "transform hover:scale-105 transition-transform duration-300 cursor-default",
          "text-shadow-neon",
          isMobile ? "text-5xl" : "text-6xl md:text-8xl"
        )}
      >
        FLAP
      </motion.h1>

      <motion.p 
        variants={textVariants}
        className={cn(
          "font-bold mb-6 text-transparent bg-clip-text",
          "bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B]",
          "drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]",
          "futuristic-text",
          isMobile ? "text-2xl" : "text-4xl md:text-5xl"
        )}
      >
        Élevez Votre Potentiel
      </motion.p>

      <motion.p 
        variants={textVariants}
        className={cn(
          "text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed",
          "drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]",
          isMobile ? "text-sm px-4" : "text-xl"
        )}
      >
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
        vers l'excellence
      </motion.p>
    </>
  );
};