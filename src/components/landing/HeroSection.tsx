import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
      }}
      className="text-center perspective-1000"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 1, ease: "easeOut" }
        }}
        className="text-7xl md:text-9xl font-bold mb-8
                   bg-gradient-to-r from-[#0C4A6E] via-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent
                   tracking-tight leading-none
                   transform hover:scale-105 transition-transform duration-500 cursor-default"
      >
        FLAP
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }}
        className="text-4xl md:text-6xl font-bold mb-8
                   bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF] bg-clip-text text-transparent
                   tracking-tight leading-tight max-w-4xl mx-auto"
      >
        Passez à l'Action, Transformez Votre Vie
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed
                   font-light tracking-wide"
      >
        Découvrez les clés d'action extraites de plus de 50 best-sellers du développement personnel. 
        Arrêtez de lire sans fin, commencez à transformer votre vie dès aujourd'hui.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } }}
        className="flex flex-col sm:flex-row gap-8 justify-center items-center"
      >
        <Button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto px-8 py-7 text-lg rounded-2xl
                   bg-gradient-to-r from-[#0C4A6E] via-[#8B5CF6] to-[#F97316] hover:from-[#0C4A6E] hover:via-[#7C3AED] hover:to-[#EA580C]
                   shadow-[0_0_30px_rgba(3,105,161,0.3)] hover:shadow-[0_0_50px_rgba(3,105,161,0.5)]
                   transform hover:-translate-y-1 transition-all duration-500
                   border border-[#0369A1]/30 font-medium tracking-wide"
        >
          Commencer Votre Transformation
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="w-full sm:w-auto px-8 py-7 text-lg rounded-2xl
                   bg-background/5 backdrop-blur-sm
                   border border-[#0369A1]/30 hover:border-[#8B5CF6]/50
                   shadow-[0_0_25px_rgba(3,105,161,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]
                   transform hover:-translate-y-1 transition-all duration-500
                   font-medium tracking-wide text-gray-300"
        >
          Découvrir la Méthode
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;