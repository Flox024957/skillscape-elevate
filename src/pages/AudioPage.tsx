import { motion } from "framer-motion";
import AudioTab from "@/components/dashboard/tabs/AudioTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const AudioPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#0A1E3D]/90 backdrop-blur-sm">
      <div className={cn(
        "mx-auto",
        isMobile ? "px-2 pt-2 pb-20" : "container p-4"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className={cn(
            "font-bold text-[#E5DEFF]",
            isMobile ? "text-2xl px-2" : "text-3xl"
          )}>
            Lecteur Audio
          </h1>
          <div className={cn(
            "glass-panel",
            isMobile ? "p-2" : "p-6"
          )}>
            <AudioTab />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPage;