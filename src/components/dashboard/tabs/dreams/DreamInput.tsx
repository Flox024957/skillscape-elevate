import { Textarea } from "@/components/ui/textarea";

interface DreamInputProps {
  dream: string;
  onChange: (value: string) => void;
}

export const DreamInput = ({ dream, onChange }: DreamInputProps) => {
  return (
    <Textarea
      value={dream}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Décrivez votre rêve professionnel ici..."
      className="min-h-[150px] bg-background/50"
    />
  );
};