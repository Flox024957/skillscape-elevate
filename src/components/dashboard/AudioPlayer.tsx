import { Card, CardContent } from "@/components/ui/card";
import VoiceSelector from "./audio/VoiceSelector";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import PlaybackControls from "./audio/PlaybackControls";
import { useAudioPlayer } from "./audio/useAudioPlayer";

interface AudioPlayerProps {
  selectedContent: string;
  userNotes?: any[];
  onContentSelect: (content: string) => void;
}

const AudioPlayer = ({ selectedContent, userNotes, onContentSelect }: AudioPlayerProps) => {
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
  } = useAudioPlayer(selectedContent);

  const handleRandomPlay = () => {
    if (!userNotes || userNotes.length === 0) {
      toast({
        title: "Aucune note disponible",
        description: "Veuillez d'abord ajouter des notes",
        variant: "destructive",
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * userNotes.length);
    const randomNote = userNotes[randomIndex];
    onContentSelect(randomNote.content);
  };

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
          onRandomPlay={handleRandomPlay}
        />
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;