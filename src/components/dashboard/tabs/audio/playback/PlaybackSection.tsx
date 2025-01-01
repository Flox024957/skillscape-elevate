import { Card } from "@/components/ui/card";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const PlaybackSection = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const isMobile = useIsMobile();

  return (
    <Card className={cn(
      "bg-[#1E3D7B]/20 border-[#1E3D7B]/30",
      isMobile ? "p-2" : "p-4"
    )}>
      <AudioPlayer
        selectedContent={selectedContent}
        onContentSelect={setSelectedContent}
        playbackSpeed={playbackSpeed}
      />
    </Card>
  );
};