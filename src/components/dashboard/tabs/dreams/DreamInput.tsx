import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DreamInputProps {
  dream: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DreamInput = ({ dream, onChange, placeholder }: DreamInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="dream-input" className="text-sm font-medium">
        Description de votre rêve
      </Label>
      <Textarea
        id="dream-input"
        value={dream}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Décrivez votre rêve professionnel ici..."}
        className="min-h-[200px] bg-background/50 resize-y"
      />
      <p className="text-xs text-muted-foreground">
        {dream.length}/2000 caractères
      </p>
    </div>
  );
};