import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import PlaybackControls from "./audio/PlaybackControls";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import VoiceSelector from "./audio/VoiceSelector";
import { Slider } from "@/components/ui/slider";
import PlaylistSelector from "./audio/playlist/PlaylistSelector";
import { usePlaylist } from "./audio/hooks/usePlaylist";
import { Skill } from "@/types/skill";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
}

const AudioPlayer = ({ selectedContent, onContentSelect, playbackSpeed = 1 }: AudioPlayerProps) => {
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
  } = useAudioPlayer(getContentFromTrack(getCurrentTrack()), playbackSpeed);

  const handlePlayContent = (content: string) => {
    handlePlay(content);
    onContentSelect(content);
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
            onPrevious={() => handlePlayContent(getContentFromTrack(previousTrack()))}
            onNext={() => handlePlayContent(getContentFromTrack(nextTrack()))}
            randomMode={randomMode}
          />
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm whitespace-nowrap">Vitesse : {playbackSpeed}x</span>
            <Slider
              value={[playbackSpeed]}
              min={0.5}
              max={2}
              step={0.1}
              className={cn("w-32", isMobile && "flex-1")}
              disabled
            />
          </div>
        </div>

        {selectedContent && (
          <div className={cn(
            "mt-4 p-4 bg-muted/50 rounded-lg",
            isMobile && "text-sm"
          )}>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;