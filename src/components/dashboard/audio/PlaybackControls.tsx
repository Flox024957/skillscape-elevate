import { Button } from "@/components/ui/button";
import { Play, Pause, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  selectedContent: string;
  onPlay: () => void;
  onRandomPlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  randomMode: boolean;
}

const PlaybackControls = ({ 
  isPlaying, 
  isPaused,
  selectedContent, 
  onPlay, 
  onRandomPlay,
  onPrevious,
  onNext,
  randomMode,
}: PlaybackControlsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={onRandomPlay}
        className={cn(
          "w-10 h-10 bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40",
          randomMode && "bg-[#1E3D7B]/40"
        )}
        title="Mode aléatoire"
      >
        <Shuffle className="w-4 h-4 text-[#E5DEFF]" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={onPrevious}
        className="w-10 h-10 bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40"
        title="Précédent"
      >
        <SkipBack className="w-4 h-4 text-[#E5DEFF]" />
      </Button>
      <Button
        size="icon"
        onClick={onPlay}
        className="w-10 h-10 bg-[#0EA5E9] hover:bg-[#0EA5E9]/80"
        title={isPlaying && !isPaused ? "Pause" : "Lecture"}
      >
        {isPlaying && !isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={onNext}
        className="w-10 h-10 bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40"
        title="Suivant"
      >
        <SkipForward className="w-4 h-4 text-[#E5DEFF]" />
      </Button>
    </div>
  );
};

export default PlaybackControls;