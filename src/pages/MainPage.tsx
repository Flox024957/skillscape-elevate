import { CategoriesSection } from "@/components/main/CategoriesSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";
import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Main Content */}
      <div className={cn(
        "container mx-auto relative z-10",
        isMobile ? "py-4" : "py-8"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CategoriesSection />
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;