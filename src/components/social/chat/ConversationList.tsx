import { ChatConversation } from '@/integrations/supabase/types/messages';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ConversationListProps {
  conversations: ChatConversation[];
  selectedFriend: string | null;
  onSelectFriend: (friendId: string) => void;
}

export const ConversationList = ({ 
  conversations, 
  selectedFriend, 
  onSelectFriend 
}: ConversationListProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "glass-panel h-full",
      isMobile ? "w-full" : "w-1/3"
    )}>
      <div className="p-3 border-b border-border/50">
        <h2 className="font-semibold neon-text">Conversations</h2>
      </div>
      <ScrollArea className="h-[calc(100%-53px)]">
        <div className="p-2 space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.friend.id}
              onClick={() => onSelectFriend(conv.friend.id)}
              className={cn(
                "w-full p-3 flex items-center gap-3 rounded-lg transition-colors relative",
                selectedFriend === conv.friend.id
                  ? "bg-primary/20"
                  : "hover:bg-muted/20"
              )}
            >
              <Avatar>
                <AvatarImage src={conv.friend.image_profile || undefined} />
                <AvatarFallback>{conv.friend.pseudo?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left flex-1 min-w-0">
                <p className="font-medium truncate">{conv.friend.pseudo}</p>
                {conv.lastMessage && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage.content}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(conv.lastMessage.created_at), "HH:mm", { locale: fr })}
                    </span>
                  </div>
                )}
              </div>
              {conv.unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full" />
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};