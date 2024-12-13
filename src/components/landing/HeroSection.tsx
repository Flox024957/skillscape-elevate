import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
      className="text-center mb-20 perspective-1000"
    >
      <motion.h1 
        initial={{ opacity: 0, filter: "brightness(0.3)" }}
        animate={{ 
          opacity: 1, 
          filter: "brightness(1)",
          textShadow: [
            "0 0 0px rgba(14,165,233,0)",
            "0 0 20px rgba(14,165,233,0.8)",
            "0 0 40px rgba(14,165,233,0.8)",
            "0 0 60px rgba(14,165,233,0.8)"
          ]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut"
        }}
        className="text-6xl md:text-8xl font-bold mb-6
                   bg-gradient-to-r from-[#0A2A4A] via-[#0EA5E9] to-[#33C3F0] text-transparent bg-clip-text
                   transform hover:scale-105 transition-transform duration-300 cursor-default
                   drop-shadow-[0_0_30px_rgba(14,165,233,0.8)]"
      >
        FLAP
      </motion.h1>
      <motion.p 
        className="text-4xl md:text-5xl font-bold mb-6
                   bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] text-transparent bg-clip-text
                   drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]"
        whileHover={{ scale: 1.02 }}
      >
        Élevez Votre Potentiel Professionnel
      </motion.p>
      <p className="text-xl text-[#B4D4E7] max-w-2xl mx-auto mb-8 leading-relaxed
                    drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression vers l'excellence professionnelle
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl 
                   bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] hover:from-[#0C93D1] hover:to-[#2DB1DB]
                   shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-[0_0_40px_rgba(14,165,233,0.7)]
                   transform hover:-translate-y-1 transition-all duration-300
                   border border-[#0EA5E9]/50"
        >
          Commencer Gratuitement
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl
                   bg-[#0A2A4A]/30 backdrop-blur-sm text-[#B4D4E7]
                   border border-[#0EA5E9]/50 hover:border-[#0EA5E9]
                   shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_35px_rgba(14,165,233,0.6)]
                   transform hover:-translate-y-1 transition-all duration-300"
        >
          Découvrir la Plateforme
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroSection;