import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  placeholder?: string;
}

export const CommentInput = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  placeholder = "Ajouter un commentaire..."
}: CommentInputProps) => {
  return (
    <div className="flex gap-2">
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[60px] bg-background/50 backdrop-blur-sm"
        disabled={isSubmitting}
      />
      <Button 
        onClick={onSubmit} 
        disabled={isSubmitting || !value.trim()}
        className="self-end"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};