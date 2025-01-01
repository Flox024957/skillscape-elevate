import { Card, CardContent } from "@/components/ui/card";
import { usePlaylist } from "../hooks/usePlaylist";
import { Skill } from "@/types/skill";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import ContentDisplay from "./ContentDisplay";
import { AudioContextType } from "@/contexts/AudioContext";
import PlaylistSection from "./PlaylistSection";
import AudioControls from "./AudioControls";

interface AudioPlayerContainerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
  audioContext: AudioContextType;
}

const AudioPlayerContainer = ({ 
  selectedContent, 
  onContentSelect, 
  playbackSpeed = 1,
  audioContext
}: AudioPlayerContainerProps) => {
  const isMobile = useIsMobile();

  const {
    currentPlaylist,
    setCurrentPlaylist,
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
    isPaused,
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
  } = audioContext;

  const handlePlayContent = (content: string) => {
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
        <PlaylistSection
          currentPlaylist={currentPlaylist}
          onPlaylistSelect={setCurrentPlaylist}
        />

        <AudioControls
          selectedVoice={selectedVoice}
          voices={voices}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          isPaused={isPaused}
          playbackSpeed={playbackSpeed}
          selectedContent={getContentFromTrack(getCurrentTrack())}
          onVoiceChange={setSelectedVoice}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
          onPlay={() => handlePlayContent(getContentFromTrack(getCurrentTrack()))}
          onRandomPlay={toggleRandomMode}
          onPrevious={handlePrevious}
          onNext={handleNext}
          randomMode={randomMode}
          formatTime={formatTime}
        />

        <ContentDisplay content={selectedContent} isMobile={isMobile} />
      </CardContent>
    </Card>
  );
};

export default AudioPlayerContainer;