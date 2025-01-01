import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";

interface SpeedControlProps {
  playbackSpeed: number;
}

const SpeedControl = ({ playbackSpeed }: SpeedControlProps) => {
  const isMobile = useIsMobile();
  
  return (
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
  );
};

export default SpeedControl;