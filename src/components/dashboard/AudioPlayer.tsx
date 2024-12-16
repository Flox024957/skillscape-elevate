import { Card, CardContent } from "@/components/ui/card";
import VoiceSelector from "./audio/VoiceSelector";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import PlaybackControls from "./audio/PlaybackControls";
import { useAudioPlayer } from "./audio/useAudioPlayer";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed?: number;
}

const AudioPlayer = ({ 
  selectedContent, 
  onContentSelect,
  playbackSpeed = 1 
}: AudioPlayerProps) => {
  const {
    isPlaying,
    selectedVoice,
    voices,
    volume,
    currentTime,
    duration,
    setSelectedVoice,
    handlePlay,
    handleVolumeChange,
    formatTime,
  } = useAudioPlayer(selectedContent, playbackSpeed);

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <VoiceSelector
            selectedVoice={selectedVoice}
            voices={voices}
            onVoiceChange={setSelectedVoice}
          />
          <VolumeControl
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
        />

        <PlaybackControls
          isPlaying={isPlaying}
          selectedContent={selectedContent}
          onPlay={handlePlay}
          onRandomPlay={() => {/* TODO: Implement random play */}}
        />
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;