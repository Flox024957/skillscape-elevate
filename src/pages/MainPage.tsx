import { CategoriesSection } from "@/components/main/CategoriesSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-10 pointer-events-none" />
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full animate-cosmic-wave-1 opacity-20 
                      bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full animate-cosmic-wave-2 opacity-20 
                      bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 animate-hexagon-spin opacity-10 
                      border-2 border-neon-purple rotate-45 transform-gpu" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 animate-hexagon-spin-reverse opacity-10 
                      border-2 border-neon-blue rotate-45 transform-gpu" />
      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(139,92,246,0.05)_1px,transparent_1px)] 
                    bg-[size:24px_24px] pointer-events-none" />
      
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