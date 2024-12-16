import { Message } from '@/integrations/supabase/types/messages';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ChatContainerProps {
  selectedFriend: string | null;
  messages: Message[];
  currentUserId: string;
  friendName?: string | null;
  onSendMessage: (content: string) => void;
}

export const ChatContainer = ({
  selectedFriend,
  messages,
  currentUserId,
  friendName,
  onSendMessage
}: ChatContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "glass-panel flex flex-col",
      isMobile ? "h-[calc(100vh-200px)]" : "flex-1"
    )}>
      {selectedFriend ? (
        <>
          <div className="p-3 border-b border-border/50">
            <h2 className="font-semibold neon-text">{friendName}</h2>
          </div>
          <MessageList messages={messages} currentUserId={currentUserId} />
          <MessageInput onSend={onSendMessage} />
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Sélectionnez une conversation
        </div>
      )}
    </div>
  );
};