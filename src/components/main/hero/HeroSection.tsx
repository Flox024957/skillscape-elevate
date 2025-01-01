import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "font-bold mb-6",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#F97316]",
          isMobile ? "text-4xl" : "text-6xl md:text-7xl"
        )}
      >
        Développez Votre Potentiel
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(
          "text-gray-300 max-w-2xl mx-auto mb-8",
          isMobile ? "text-sm px-4" : "text-xl"
        )}
      >
        Découvrez une nouvelle façon d'apprendre et de progresser. 
        Rejoignez une communauté dynamique et accédez à des outils innovants 
        pour atteindre vos objectifs professionnels.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={cn(
          "flex gap-4",
          isMobile ? "flex-col px-4" : "flex-row justify-center"
        )}
      >
        <Button
          onClick={() => navigate("/auth")}
          size={isMobile ? "default" : "lg"}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-xl
                   hover:shadow-[#8B5CF6]/50 transition-all duration-300"
        >
          Commencer Maintenant
        </Button>
        <Button
          onClick={() => navigate("/auth")}
          variant="outline"
          size={isMobile ? "default" : "lg"}
          className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10
                   shadow-lg hover:shadow-[#8B5CF6]/30 transition-all duration-300"
        >
          En Savoir Plus
        </Button>
      </motion.div>
    </div>
  );
};