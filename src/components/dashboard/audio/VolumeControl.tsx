import { Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "flex items-center gap-2",
      isMobile && "w-full"
    )}>
      <Volume2 className="w-4 h-4 text-[#E5DEFF]" />
      <Slider
        value={[volume]}
        max={1}
        step={0.1}
        onValueChange={onVolumeChange}
        className={cn(
          "w-24",
          isMobile && "flex-1"
        )}
      />
    </div>
  );
};

export default VolumeControl;