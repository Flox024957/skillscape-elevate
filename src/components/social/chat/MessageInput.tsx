import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export const MessageInput = ({ message, onChange, onSend }: MessageInputProps) => {
  return (
    <div className="p-4 border-t border-border/50">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 glass-panel"
        />
        <Button onClick={onSend} className="futuristic-button">
          Envoyer
        </Button>
      </div>
    </div>
  );
};