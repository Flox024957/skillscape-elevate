import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer } from "../useAudioPlayer";
import PlaybackControls from "../PlaybackControls";
import VolumeControl from "../VolumeControl";
import ProgressBar from "../ProgressBar";
import VoiceSelector from "../VoiceSelector";
import PlaylistSelector from "../playlist/PlaylistSelector";
import { usePlaylist } from "../hooks/usePlaylist";
import { Skill } from "@/types/skill";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import SpeedControl from "./SpeedControl";
import ContentDisplay from "./ContentDisplay";

interface AudioPlayerContainerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
}

const AudioPlayerContainer = ({ 
  selectedContent, 
  onContentSelect, 
  playbackSpeed = 1 
}: AudioPlayerContainerProps) => {
  const isMobile = useIsMobile();

  const {
    currentPlaylist,
    setCurrentPlaylist,
    playlistContent,
    randomMode,
    nextTrack,
    previousTrack,
    getCurrentTrack,
    toggleRandomMode,
  } = usePlaylist();

  const getContentFromTrack = (track: Skill | null): string => {
    if (!track) return selectedContent;
    return `
      Titre : ${track.titre}
      
      Résumé : ${track.resume}
      
      Description : ${track.description}
      
      Action concrète : ${track.action_concrete}
      
      Exemples : ${Array.isArray(track.exemples) ? track.exemples.join(', ') : ''}
    `.trim();
  };

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
    handleSeek,
  } = useAudioPlayer(getContentFromTrack(getCurrentTrack()), playbackSpeed);

  const handlePlayContent = (content: string) => {
    if (!selectedVoice) {
      toast.error("Veuillez sélectionner une voix avant de démarrer la lecture");
      return;
    }
    handlePlay(content);
    onContentSelect(content);
  };

  const handleNext = () => {
    const nextContent = getContentFromTrack(nextTrack());
    handlePlayContent(nextContent);
  };

  const handlePrevious = () => {
    const previousContent = getContentFromTrack(previousTrack());
    handlePlayContent(previousContent);
  };

  return (
    <Card>
      <CardContent className={cn(
        "space-y-4",
        isMobile ? "p-2" : "p-6"
      )}>
        <PlaylistSelector 
          currentPlaylist={currentPlaylist} 
          onPlaylistSelect={setCurrentPlaylist}
        />

        <div className={cn(
          "flex justify-between gap-4",
          isMobile ? "flex-col" : "flex-row"
        )}>
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
          onSeek={handleSeek}
        />

        <div className={cn(
          "flex items-center justify-between gap-4",
          isMobile ? "flex-col" : "flex-row"
        )}>
          <PlaybackControls
            isPlaying={isPlaying}
            selectedContent={getContentFromTrack(getCurrentTrack())}
            onPlay={() => handlePlayContent(getContentFromTrack(getCurrentTrack()))}
            onRandomPlay={toggleRandomMode}
            onPrevious={handlePrevious}
            onNext={handleNext}
            randomMode={randomMode}
          />
          <SpeedControl playbackSpeed={playbackSpeed} />
        </div>

        <ContentDisplay content={selectedContent} isMobile={isMobile} />
      </CardContent>
    </Card>
  );
};

export default AudioPlayerContainer;