import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface VoiceSelectorProps {
  selectedVoice: string;
  voices: SpeechSynthesisVoice[];
  onVoiceChange: (voice: string) => void;
}

const VoiceSelector = ({ selectedVoice, voices, onVoiceChange }: VoiceSelectorProps) => {
  const isMobile = useIsMobile();

  return (
    <Select
      value={selectedVoice}
      onValueChange={onVoiceChange}
    >
      <SelectTrigger className={cn(
        isMobile ? "w-full text-sm h-9" : "w-[280px]",
        "bg-[#1E3D7B]/20 border-[#1E3D7B]/30"
      )}>
        <SelectValue placeholder="Sélectionner une voix" />
      </SelectTrigger>
      <SelectContent className={cn(
        "bg-[#0A1E3D]/95 border-[#1E3D7B]/30 backdrop-blur-sm",
        isMobile && "w-[calc(100vw-2rem)]"
      )}>
        {voices.map((voice) => (
          <SelectItem 
            key={voice.name} 
            value={voice.name}
            className={cn(
              "flex items-center space-x-2",
              isMobile && "text-sm py-1.5"
            )}
          >
            <span className="truncate">
              {voice.name} ({voice.lang})
              {voice.localService && " - Local"}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VoiceSelector;