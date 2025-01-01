import { Card } from "@/components/ui/card";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const PlaybackSection = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "bg-[#1E3D7B]/20 border-[#1E3D7B]/30",
        "backdrop-blur-xl shadow-lg",
        "transform hover:scale-[1.01] transition-all duration-300",
        isMobile ? "p-2" : "p-4"
      )}>
        <AudioPlayer
          selectedContent={selectedContent}
          onContentSelect={setSelectedContent}
          playbackSpeed={playbackSpeed}
        />
      </Card>
    </motion.div>
  );
};