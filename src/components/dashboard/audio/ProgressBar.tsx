import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  formatTime: (ms: number) => string;
  onSeek?: (value: number) => void;
}

const ProgressBar = ({ currentTime, duration, formatTime, onSeek }: ProgressBarProps) => {
  const handleSeek = (value: number[]) => {
    if (onSeek) {
      onSeek(value[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <Slider
        value={[currentTime]}
        max={duration}
        step={50}
        className="w-full"
        onValueChange={handleSeek}
      />
    </div>
  );
};

export default ProgressBar;