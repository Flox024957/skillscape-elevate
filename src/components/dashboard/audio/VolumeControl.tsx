import { Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <Volume2 className="w-4 h-4" />
      <Slider
        value={[volume]}
        max={1}
        step={0.1}
        onValueChange={onVolumeChange}
        className="w-24"
      />
    </div>
  );
};

export default VolumeControl;