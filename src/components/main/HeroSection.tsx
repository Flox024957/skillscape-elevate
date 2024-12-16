import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12 md:mb-20 space-y-6 px-4"
    >
      <motion.h1 
        className={cn(
          "font-bold mb-4 bg-clip-text text-transparent",
          "bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400",
          isMobile ? "text-4xl" : "text-5xl md:text-7xl"
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Bienvenue sur FLAP
      </motion.h1>
      
      <motion.p 
        className={cn(
          "text-gray-300 mx-auto",
          isMobile ? "text-lg" : "text-xl md:text-2xl max-w-3xl"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
        vers l'excellence professionnelle
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          size={isMobile ? "default" : "lg"}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                   text-white font-semibold rounded-xl shadow-lg hover:shadow-xl
                   transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => navigate("/auth")}
        >
          Commencer Maintenant
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size={isMobile ? "default" : "lg"}
          className="border-purple-500/50 hover:border-purple-500 text-purple-400
                   hover:text-purple-300 font-semibold rounded-xl
                   backdrop-blur-sm transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          Explorer la Plateforme
        </Button>
      </motion.div>
    </motion.div>
  );
};
