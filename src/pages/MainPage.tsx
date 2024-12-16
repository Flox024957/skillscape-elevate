import { SearchBar } from "@/components/social/SearchBar";
import { HeroSection } from "@/components/main/HeroSection";
import { FeaturesSection } from "@/components/main/FeaturesSection";
import { CategoriesSection } from "@/components/main/CategoriesSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MainPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-purple-900/20 pointer-events-none" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full animate-cosmic-wave-1 opacity-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full animate-cosmic-wave-2 opacity-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </div>
      
      <div className={cn(
        "container mx-auto relative z-10",
        isMobile ? "py-4" : "py-8"
      )}>
        <HeroSection />

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "mx-auto mb-16",
            isMobile ? "w-full px-4" : "max-w-3xl"
          )}
        >
          <SearchBar />
        </motion.div>

        <FeaturesSection />
        <CategoriesSection />
      </div>
    </div>
  );
};

export default MainPage;
