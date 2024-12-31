import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const MarketingHero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className={cn(
          "font-bold bg-clip-text text-transparent",
          "bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#F97316]",
          "drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]",
          isMobile ? "text-5xl" : "text-7xl"
        )}>
          FLAP
        </h1>
        
        <h2 className={cn(
          "font-bold text-transparent bg-clip-text",
          "bg-gradient-to-r from-white via-primary/80 to-white",
          isMobile ? "text-2xl" : "text-4xl"
        )}>
          Élevez Votre Potentiel Professionnel
        </h2>

        <p className={cn(
          "text-gray-300 max-w-2xl mx-auto",
          isMobile ? "text-sm" : "text-lg"
        )}>
          Une plateforme innovante qui combine l'apprentissage audio, 
          la gestion des compétences et le networking professionnel pour 
          accélérer votre développement de carrière.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={() => navigate("/auth")}
            className="px-8 py-6 text-lg rounded-xl
                     bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] hover:from-[#0C93D9] hover:to-[#7C4EF3]
                     shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-[0_0_40px_rgba(14,165,233,0.7)]
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            Commencer Gratuitement
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="px-8 py-6 text-lg rounded-xl
                     bg-background/30 backdrop-blur-sm
                     border border-[#F97316]/50 hover:border-[#F97316]
                     shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            Découvrir la Plateforme
          </Button>
        </div>
      </motion.div>
    </div>
  );
};