import { Card } from "@/components/ui/card";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { useState } from "react";

export const PlaybackSection = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <AudioPlayer
        selectedContent={selectedContent}
        onContentSelect={setSelectedContent}
        playbackSpeed={playbackSpeed}
      />
    </Card>
  );
};