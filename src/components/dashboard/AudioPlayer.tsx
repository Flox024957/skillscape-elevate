import { Card, CardContent } from "@/components/ui/card";
import VoiceSelector from "./audio/VoiceSelector";
import VolumeControl from "./audio/VolumeControl";
import ProgressBar from "./audio/ProgressBar";
import PlaybackControls from "./audio/PlaybackControls";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  selectedContent: string;
  userSkills?: any[];
  onContentSelect: (content: string) => void;
}

const AudioPlayer = ({ selectedContent, userSkills, onContentSelect }: AudioPlayerProps) => {
  const { toast } = useToast();
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
    if (!userSkills || userSkills.length === 0) {
      toast({
        title: "Aucune compétence disponible",
        description: "Veuillez d'abord sélectionner des compétences",
        variant: "destructive",
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * userSkills.length);
    const randomSkill = userSkills[randomIndex];
    onContentSelect(`${randomSkill.titre}. ${randomSkill.resume}. ${randomSkill.description}`);
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