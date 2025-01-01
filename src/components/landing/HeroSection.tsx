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
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.5)",
            "0 0 40px rgba(255,255,255,0.5)",
            "0 0 60px rgba(255,255,255,0.5)"
          ]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut"
        }}
        className="text-6xl md:text-8xl font-bold mb-6 text-[#E5E7EB]
                   transform hover:scale-105 transition-transform duration-300 cursor-default
                   drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
      >
        FLAP
      </motion.h1>
      <motion.p 
        className="text-4xl md:text-5xl font-bold mb-6 text-[#D1D5DB]
                   drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        whileHover={{ scale: 1.02 }}
      >
        Révélez Votre Plein Potentiel
      </motion.p>
      <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed
                    drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
        Développez vos compétences, fixez des objectifs inspirants et suivez votre progression 
        vers l'accomplissement personnel
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-[#0070F3] to-[#0EA5E9] hover:from-[#0051F3] hover:to-[#0C93D9]
                   shadow-[0_0_30px_rgba(0,112,243,0.5)] hover:shadow-[0_0_40px_rgba(0,112,243,0.7)]
                   transform hover:-translate-y-1 transition-all duration-300
                   border border-[#0070F3]/50"
        >
          Commencer Votre Voyage
        </Button>
        <Button
          onClick={() => navigate("/auth")}
          variant="outline"
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl
                   bg-background/30 backdrop-blur-sm
                   border border-[#F97316]/50 hover:border-[#F97316]
                   shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]
                   transform hover:-translate-y-1 transition-all duration-300"
        >
          Explorer la Plateforme
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroSection;