import { ChatConversation } from '@/integrations/supabase/types/messages';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  return (
    <div className="w-1/3 glass-panel">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold neon-text">Conversations</h2>
      </div>
      <ScrollArea className="h-[calc(600px-65px)]">
        <div className="p-2 space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.friend.id}
              onClick={() => onSelectFriend(conv.friend.id)}
              className={cn(
                "w-full p-3 flex items-center gap-3 rounded-lg transition-colors",
                selectedFriend === conv.friend.id
                  ? "bg-primary/20"
                  : "hover:bg-muted/20"
              )}
            >
              <Avatar>
                <AvatarImage src={conv.friend.image_profile || undefined} />
                <AvatarFallback>{conv.friend.pseudo?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium">{conv.friend.pseudo}</p>
                {conv.lastMessage && (
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage.content}
                  </p>
                )}
              </div>
              {conv.unreadCount > 0 && (
                <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};