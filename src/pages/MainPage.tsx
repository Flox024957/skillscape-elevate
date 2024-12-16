import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";
import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { CategoriesSection } from "@/components/main/CategoriesSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      {/* Background Effects */}
      <AnimatedBackground />

      {/* Main Content */}
      <ScrollArea className="h-[calc(100vh-4rem)] relative">
        <div className={cn(
          "container mx-auto relative z-10",
          isMobile ? "py-6 px-4" : "py-12 px-6"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              "glass-panel-pro overflow-hidden rounded-3xl",
              isMobile ? "p-6" : "p-12 mb-16"
            )}
          >
            <HeroSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={cn(
              "glass-panel-pro overflow-hidden rounded-3xl mt-6",
              isMobile ? "p-6" : "p-12"
            )}
          >
            <CategoriesSection />
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MainPage;