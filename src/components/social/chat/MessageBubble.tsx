import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/integrations/supabase/types/messages";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={message.profiles?.image_profile || '/placeholder.svg'} 
            alt={message.profiles?.pseudo || 'User'} 
          />
          <AvatarFallback>
            {message.profiles?.pseudo?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      <div 
        className={`glass-panel p-3 max-w-[80%] ${
          isCurrentUser ? 'bg-primary/20' : 'bg-muted/20'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};