import { Message } from "@/integrations/supabase/types/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div className={cn("flex items-start gap-2", isCurrentUser && "flex-row-reverse")}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={message.profiles?.image_profile || undefined} 
            alt={message.profiles?.pseudo || 'User'} 
          />
          <AvatarFallback>
            {message.profiles?.pseudo?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "px-4 py-2 rounded-lg max-w-[70%]",
            isCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          {message.content}
        </div>
        <span className="text-xs text-muted-foreground">
          {format(new Date(message.created_at), "HH:mm", { locale: fr })}
        </span>
      </div>
    </div>
  );
};