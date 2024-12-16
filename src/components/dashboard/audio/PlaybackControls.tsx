import { Button } from "@/components/ui/button";
import { Play, Pause, Shuffle, SkipBack, SkipForward } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  selectedContent: string;
  onPlay: () => void;
  onRandomPlay: () => void;
}

const PlaybackControls = ({ 
  isPlaying, 
  selectedContent, 
  onPlay, 
  onRandomPlay 
}: PlaybackControlsProps) => {
  return (
    <div className="flex justify-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={onRandomPlay}
        className="w-10 h-10"
      >
        <Shuffle className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="w-10 h-10"
        disabled={!selectedContent}
      >
        <SkipBack className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        onClick={onPlay}
        className="w-10 h-10"
        disabled={!selectedContent}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="w-10 h-10"
        disabled={!selectedContent}
      >
        <SkipForward className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PlaybackControls;