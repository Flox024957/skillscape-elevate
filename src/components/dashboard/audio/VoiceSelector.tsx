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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sélectionner une voix" />
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice) => (
          <SelectItem key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VoiceSelector;