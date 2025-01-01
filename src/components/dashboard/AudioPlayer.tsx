import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import PlaybackControls from "./audio/PlaybackControls";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import VoiceSelector from "./audio/VoiceSelector";
import { Slider } from "@/components/ui/slider";
import { Skill } from "./audio/types";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
  skills?: Skill[];
  selectedSkillIndex?: number;
  onSkillChange?: (index: number) => void;
}

const AudioPlayer = ({ 
  selectedContent, 
  onContentSelect, 
  playbackSpeed = 1,
  skills = [],
  selectedSkillIndex = -1,
  onSkillChange
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
    if (skills.length > 0 && selectedSkillIndex < skills.length - 1 && onSkillChange) {
      onSkillChange(selectedSkillIndex + 1);
    }
  });

  const handleRandomPlay = () => {
    setRandomMode(!randomMode);
    if (!randomMode && skills.length > 0 && onSkillChange) {
      const randomIndex = Math.floor(Math.random() * skills.length);
      onSkillChange(randomIndex);
    }
  };

  const handlePrevious = () => {
    if (selectedSkillIndex > 0 && onSkillChange) {
      onSkillChange(selectedSkillIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedSkillIndex < skills.length - 1 && onSkillChange) {
      onSkillChange(selectedSkillIndex + 1);
    }
  };

  const handlePlayClick = () => {
    if (!selectedContent) return;
    handlePlay();
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
            onPlay={handlePlayClick}
            onRandomPlay={handleRandomPlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPlaylist={skills.length > 0}
            isFirst={selectedSkillIndex === 0}
            isLast={selectedSkillIndex === skills.length - 1}
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