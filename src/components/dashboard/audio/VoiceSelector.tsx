import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceSelectorProps {
  selectedVoice: string;
  voices: SpeechSynthesisVoice[];
  onVoiceChange: (voice: string) => void;
}

const VoiceSelector = ({ selectedVoice, voices, onVoiceChange }: VoiceSelectorProps) => {
  return (
    <Select
      value={selectedVoice}
      onValueChange={onVoiceChange}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Sélectionner une voix" />
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice) => (
          <SelectItem 
            key={voice.name} 
            value={voice.name}
            className="flex items-center space-x-2"
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