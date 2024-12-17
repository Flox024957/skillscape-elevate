import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

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

  const sparkleVariants = {
    initial: { scale: 0, rotate: -30 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.2
      }
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "font-bold mb-6 text-white relative",
            "drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]",
            "transform hover:scale-105 transition-transform duration-300 cursor-default",
            "text-shadow-neon",
            isMobile ? "text-5xl" : "text-6xl md:text-8xl"
          )}
        >
          FLAP
          <motion.span
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            className="absolute -top-4 -right-8"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.span>
        </motion.h1>
      </div>

      <motion.p 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "font-bold mb-6 text-transparent bg-clip-text",
          "bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B]",
          "drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]",
          "futuristic-text hover:scale-105 transition-transform duration-300",
          isMobile ? "text-2xl" : "text-4xl md:text-5xl"
        )}
      >
        Élevez Votre Potentiel
      </motion.p>

      <motion.p 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed",
          "drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]",
          "hover:text-white transition-colors duration-300",
          isMobile ? "text-sm px-4" : "text-xl"
        )}
      >
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
        vers l'excellence
      </motion.p>
    </>
  );
};