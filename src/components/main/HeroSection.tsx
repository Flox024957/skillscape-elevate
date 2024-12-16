import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

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

  const buttonVariants = {
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
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="text-center mb-20 perspective-1000"
    >
      <motion.h1 
        variants={textVariants}
        className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text 
                 bg-gradient-to-r from-[#0A1E3D] via-[#0E2A5E] to-[#1E3D7B]
                 animate-text-shimmer drop-shadow-[0_0_30px_rgba(138,43,226,0.5)]
                 transform hover:scale-105 transition-transform duration-300 cursor-default
                 text-shadow-neon"
      >
        FLAP
      </motion.h1>

      <motion.p 
        variants={textVariants}
        className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text
                 bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B]
                 drop-shadow-[0_0_20px_rgba(138,43,226,0.4)]
                 futuristic-text"
      >
        Élevez Votre Potentiel Professionnel
      </motion.p>

      <motion.p 
        variants={textVariants}
        className="text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed
                 drop-shadow-[0_0_5px_rgba(138,43,226,0.3)]"
      >
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
        vers l'excellence professionnelle
      </motion.p>

      <motion.div 
        variants={textVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => navigate("/auth")}
            className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl 
                     bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B] hover:from-[#0E2A5E] hover:to-[#2A4F8F]
                     shadow-[0_0_30px_rgba(138,43,226,0.5)] hover:shadow-[0_0_40px_rgba(138,43,226,0.7)]
                     transform hover:-translate-y-1 transition-all duration-300
                     border border-[#8A2BE2]/50"
          >
            Commencer Gratuitement
          </Button>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl
                     bg-background/30 backdrop-blur-sm
                     border border-[#8A2BE2]/50 hover:border-[#8A2BE2]
                     shadow-[0_0_25px_rgba(138,43,226,0.4)] hover:shadow-[0_0_35px_rgba(138,43,226,0.6)]
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            Découvrir la Plateforme
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;