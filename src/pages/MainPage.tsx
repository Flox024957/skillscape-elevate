import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/main/HeroSection";
import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { CategoriesSection } from "@/components/main/categories/CategoriesSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CosmicEffects } from "@/components/main/background/CosmicEffects";
import { EnergyOrbs } from "@/components/main/background/EnergyOrbs";
import { Button } from "@/components/ui/button";
import { ArrowUp, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const MainPage = () => {
  const isMobile = useIsMobile();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm">
      <AnimatedBackground />
      <CosmicEffects />
      <EnergyOrbs />

      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="fixed top-4 right-4 z-50 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-4 mt-8">
              <Button variant="ghost" className="justify-start" onClick={() => window.location.href = '/dashboard'}>
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => window.location.href = '/profile'}>
                Profil
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => window.location.href = '/settings'}>
                Paramètres
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      )}

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
              "transform hover:scale-[1.02] transition-all duration-500",
              "hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]",
              isMobile ? "p-4" : "p-12 mb-16"
            )}
          >
            <HeroSection />
          </motion.div>

          <motion.div
            id="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={cn(
              "glass-panel-pro overflow-hidden rounded-3xl mt-6",
              "transform hover:scale-[1.01] transition-all duration-500",
              "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]",
              isMobile ? "p-4" : "p-12"
            )}
          >
            <CategoriesSection />
          </motion.div>
        </div>
      </ScrollArea>

      {showScrollTop && isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full bg-primary/80 backdrop-blur-sm shadow-lg hover:bg-primary"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MainPage;