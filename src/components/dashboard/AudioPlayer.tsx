import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import PlaybackControls from "./audio/PlaybackControls";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import VoiceSelector from "./audio/VoiceSelector";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
  playlist?: { id: string; titre: string; resume: string }[];
  currentPlaylistIndex?: number;
  onPlaylistIndexChange?: (index: number) => void;
}

const AudioPlayer = ({ 
  selectedContent, 
  onContentSelect, 
  playbackSpeed = 1,
  playlist = [],
  currentPlaylistIndex = -1,
  onPlaylistIndexChange
}: AudioPlayerProps) => {
  const [randomMode, setRandomMode] = useState(false);
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
    onEnd
  } = useAudioPlayer(selectedContent, playbackSpeed, () => {
    if (playlist.length > 0 && currentPlaylistIndex < playlist.length - 1 && onPlaylistIndexChange) {
      onPlaylistIndexChange(currentPlaylistIndex + 1);
    }
  });

  const handleRandomPlay = () => {
    setRandomMode(!randomMode);
    if (!randomMode && playlist.length > 0 && onPlaylistIndexChange) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      onPlaylistIndexChange(randomIndex);
    }
  };

  const handlePrevious = () => {
    if (currentPlaylistIndex > 0 && onPlaylistIndexChange) {
      onPlaylistIndexChange(currentPlaylistIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPlaylistIndex < playlist.length - 1 && onPlaylistIndexChange) {
      onPlaylistIndexChange(currentPlaylistIndex + 1);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <PlaybackControls
            isPlaying={isPlaying}
            selectedContent={selectedContent}
            onPlay={handlePlay}
            onRandomPlay={handleRandomPlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPlaylist={playlist.length > 0}
            isFirst={currentPlaylistIndex === 0}
            isLast={currentPlaylistIndex === playlist.length - 1}
          />
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm whitespace-nowrap">Vitesse : {playbackSpeed}x</span>
            <Slider
              value={[playbackSpeed]}
              min={0.5}
              max={2}
              step={0.1}
              className="w-32"
              disabled
            />
          </div>
        </div>

        {selectedContent && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">{selectedContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;