import AudioPlayerContainer from "./audio/player/AudioPlayerContainer";
import { useAudio } from "@/contexts/AudioContext";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
}

const AudioPlayer = ({ selectedContent, onContentSelect, playbackSpeed }: AudioPlayerProps) => {
  const audioContext = useAudio();

  return (
    <AudioPlayerContainer
      selectedContent={selectedContent}
      onContentSelect={onContentSelect}
      playbackSpeed={playbackSpeed}
      audioContext={audioContext}
    />
  );
};

export default AudioPlayer;