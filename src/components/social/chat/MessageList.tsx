import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/integrations/supabase/types/messages";
import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea 
      className="flex-1 p-4" 
      ref={scrollAreaRef}
    >
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