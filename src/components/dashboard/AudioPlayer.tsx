import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import PlaybackControls from "./audio/PlaybackControls";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import VoiceSelector from "./audio/VoiceSelector";
import { Slider } from "@/components/ui/slider";
import PlaylistSelector from "./audio/playlist/PlaylistSelector";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
}

const AudioPlayer = ({ selectedContent, onContentSelect, playbackSpeed = 1 }: AudioPlayerProps) => {
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
    currentPlaylist,
    setCurrentPlaylist,
  } = useAudioPlayer(selectedContent, playbackSpeed);

  const handleRandomPlay = () => {
    setRandomMode(!randomMode);
  };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <PlaylistSelector 
          currentPlaylist={currentPlaylist} 
          onPlaylistSelect={setCurrentPlaylist}
        />

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