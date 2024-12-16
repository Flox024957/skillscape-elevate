import { CategoriesSection } from "@/components/main/CategoriesSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
        {/* Cosmic Wave Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full animate-cosmic-wave-1 opacity-20 
                        bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full animate-cosmic-wave-2 opacity-20 
                        bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
        </div>

        {/* Nebula Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 animate-nebula-pulse-1 
                        bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 animate-nebula-pulse-2 
                        bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
        </div>

        {/* Star Field Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] 
                      bg-[length:20px_20px] opacity-50" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(139,92,246,0.05)_1px,transparent_1px)] 
                      bg-[size:24px_24px] opacity-30" />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ rotate: 0, scale: 0.8, opacity: 0.2 }}
          animate={{ rotate: 360, scale: 1.2, opacity: 0.4 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-neon-purple rotate-45 transform-gpu"
        />
        <motion.div 
          initial={{ rotate: 360, scale: 1.2, opacity: 0.4 }}
          animate={{ rotate: 0, scale: 0.8, opacity: 0.2 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-neon-blue rotate-45 transform-gpu"
        />
      </div>

      {/* Energy Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.2, opacity: 0.6 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 
                   rounded-full blur-xl transform-gpu"
        />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 0.8, opacity: 0.4 }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 
                   rounded-full blur-xl transform-gpu"
        />
      </div>

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