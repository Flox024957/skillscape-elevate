import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/integrations/supabase/types/messages";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isCurrentUser={msg.sender_id === currentUserId}
          />
        ))}
      </div>
    </ScrollArea>
  );
};