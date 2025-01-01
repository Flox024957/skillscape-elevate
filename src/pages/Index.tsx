import { AnimatedBackground } from "@/components/main/background/AnimatedBackground";
import { HeroSection } from "@/components/main/hero/HeroSection";
import { MarketingSection } from "@/components/main/marketing/MarketingSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const isMobile = useIsMobile();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden bg-[#0A0118]/90 backdrop-blur-sm",
      "touch-pan-y"
    )}>
      <AnimatedBackground />
      
      <main className={cn(
        "relative z-10 container mx-auto",
        isMobile ? "px-4 py-8" : "px-8 py-16"
      )}>
        <div className="space-y-16 md:space-y-24">
          <HeroSection />
          <MarketingSection />
          <CallToAction />
        </div>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "fixed bottom-20 right-4 z-50",
              "transform hover:scale-105 transition-transform"
            )}
          >
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToTop}
              className={cn(
                "rounded-full w-10 h-10",
                "bg-primary/20 border-primary/30",
                "hover:bg-primary/30 hover:border-primary/40",
                "shadow-lg shadow-primary/20"
              )}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;