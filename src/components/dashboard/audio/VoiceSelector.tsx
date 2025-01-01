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
        isMobile ? "w-full text-sm" : "w-[280px]"
      )}>
        <SelectValue placeholder="Sélectionner une voix" />
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice) => (
          <SelectItem 
            key={voice.name} 
            value={voice.name}
            className={cn(
              "flex items-center space-x-2",
              isMobile && "text-sm"
            )}
          >
            <span>
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