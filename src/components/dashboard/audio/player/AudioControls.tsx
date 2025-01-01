import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import VoiceSelector from "../VoiceSelector";
import VolumeControl from "../VolumeControl";
import ProgressBar from "../ProgressBar";
import PlaybackControls from "../PlaybackControls";
import SpeedControl from "./SpeedControl";

interface AudioControlsProps {
  selectedVoice: string;
  voices: SpeechSynthesisVoice[];
  volume: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isPaused: boolean;
  playbackSpeed: number;
  selectedContent: string;
  onVoiceChange: (voice: string) => void;
  onVolumeChange: (value: number[]) => void;
  onSeek: (time: number) => void;
  onPlay: () => void;
  onRandomPlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  randomMode: boolean;
  formatTime: (ms: number) => string;
}

const AudioControls = ({
  selectedVoice,
  voices,
  volume,
  currentTime,
  duration,
  isPlaying,
  isPaused,
  playbackSpeed,
  selectedContent,
  onVoiceChange,
  onVolumeChange,
  onSeek,
  onPlay,
  onRandomPlay,
  onPrevious,
  onNext,
  randomMode,
  formatTime,
}: AudioControlsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className={cn(
        "flex justify-between gap-4",
        isMobile ? "flex-col" : "flex-row"
      )}>
        <VoiceSelector
          selectedVoice={selectedVoice}
          voices={voices}
          onVoiceChange={onVoiceChange}
        />
        <VolumeControl
          volume={volume}
          onVolumeChange={onVolumeChange}
        />
      </div>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        formatTime={formatTime}
        onSeek={onSeek}
      />

      <div className={cn(
        "flex items-center justify-between gap-4",
        isMobile ? "flex-col" : "flex-row"
      )}>
        <PlaybackControls
          isPlaying={isPlaying}
          isPaused={isPaused}
          selectedContent={selectedContent}
          onPlay={onPlay}
          onRandomPlay={onRandomPlay}
          onPrevious={onPrevious}
          onNext={onNext}
          randomMode={randomMode}
        />
        <SpeedControl playbackSpeed={playbackSpeed} />
      </div>
    </div>
  );
};

export default AudioControls;