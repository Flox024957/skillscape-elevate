import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  formatTime: (ms: number) => string;
}

const ProgressBar = ({ currentTime, duration, formatTime }: ProgressBarProps) => {
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
        disabled
      />
    </div>
  );
};

export default ProgressBar;