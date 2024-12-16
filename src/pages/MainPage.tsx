import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";
import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { CosmicEffects } from "@/components/main/background/CosmicEffects";
import { EnergyOrbs } from "@/components/main/background/EnergyOrbs";
import { CategoriesSection } from "@/components/main/CategoriesSection";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      {/* Background Effects */}
      <AnimatedBackground />
      <CosmicEffects />
      <EnergyOrbs />

      {/* Effet de bordure néon subtil */}
      <div className="absolute inset-0 border border-neon-purple/10 
                    shadow-[inset_0_0_100px_rgba(139,92,246,0.1)] pointer-events-none" />

      {/* Main Content */}
      <div className={cn(
        "container mx-auto relative z-10",
        isMobile ? "py-4 px-2" : "py-12 px-6"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel-pro neon-frame-subtle overflow-hidden p-12 mb-16 rounded-2xl"
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-panel-pro neon-frame-subtle overflow-hidden p-12 rounded-2xl"
        >
          <CategoriesSection />
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;