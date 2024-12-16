import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <div className={cn(
      "p-4 border-t border-border/50",
      isMobile && "sticky bottom-0 bg-background/80 backdrop-blur-sm"
    )}>
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 glass-panel"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <Button 
          onClick={handleSend} 
          size={isMobile ? "icon" : "default"}
          className={cn(
            "futuristic-button",
            !isMobile && "px-4"
          )}
        >
          {isMobile ? (
            <Send className="h-4 w-4" />
          ) : (
            "Envoyer"
          )}
        </Button>
      </div>
    </div>
  );
};