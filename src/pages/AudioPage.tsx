import { motion } from "framer-motion";
import AudioTab from "@/components/dashboard/tabs/AudioTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const AudioPage = () => {
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
    <div className="min-h-screen bg-[#0A1E3D]/90 backdrop-blur-sm">
      <div className={cn(
        "mx-auto",
        isMobile ? "px-2 pt-2 pb-24" : "container p-4"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className={cn(
            "font-bold text-[#E5DEFF]",
            isMobile ? "text-2xl px-2 sticky top-0 z-10 bg-[#0A1E3D]/95 py-4 backdrop-blur-sm" : "text-3xl"
          )}>
            Lecteur Audio
          </h1>
          <div className={cn(
            "glass-panel relative",
            isMobile ? "p-2" : "p-6"
          )}>
            <AudioTab />
          </div>
        </motion.div>
      </div>

      {showScrollTop && isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className="rounded-full bg-primary/20 hover:bg-primary/30 backdrop-blur-sm"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AudioPage;