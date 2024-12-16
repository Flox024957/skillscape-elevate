import { CategoriesSection } from "@/components/main/CategoriesSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";
import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { CosmicEffects } from "@/components/main/background/CosmicEffects";
import { EnergyOrbs } from "@/components/main/background/EnergyOrbs";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-background/50 backdrop-blur-sm">
      {/* Background Effects */}
      <AnimatedBackground />
      <CosmicEffects />
      <EnergyOrbs />

      {/* Effet de bordure néon */}
      <div className="absolute inset-0 border border-neon-purple/20 
                    shadow-[inset_0_0_100px_rgba(139,92,246,0.2)] pointer-events-none" />

      {/* Main Content */}
      <div className={cn(
        "container mx-auto relative z-10",
        isMobile ? "py-4 px-2" : "py-8 px-4"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel neon-frame overflow-hidden p-8 mb-12"
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-panel neon-frame overflow-hidden p-8"
        >
          <CategoriesSection />
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;