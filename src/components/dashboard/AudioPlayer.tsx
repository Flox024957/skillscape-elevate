import AudioPlayerContainer from "./audio/player/AudioPlayerContainer";

interface AudioPlayerProps {
  selectedContent: string;
  onContentSelect: (content: string) => void;
  playbackSpeed: number;
}

const AudioPlayer = ({ selectedContent, onContentSelect, playbackSpeed }: AudioPlayerProps) => {
  return (
    <AudioPlayerContainer
      selectedContent={selectedContent}
      onContentSelect={onContentSelect}
      playbackSpeed={playbackSpeed}
    />
  );
};

export default AudioPlayer;