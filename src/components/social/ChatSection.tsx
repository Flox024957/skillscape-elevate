import { useChat } from "@/hooks/use-chat";
import { ConversationList } from './chat/ConversationList';
import { ChatContainer } from './chat/ChatContainer';
import { memo, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ChatSectionProps {
  userId: string;
}

const MemoizedConversationList = memo(ConversationList);
const MemoizedChatContainer = memo(ChatContainer);

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const { messages, conversations, selectedFriend, setSelectedFriend, sendMessage } = useChat(userId);
  const selectedConversation = conversations.find(c => c.friend.id === selectedFriend);
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        (payload: any) => {
          // Show notification for new messages
          const senderProfile = conversations.find(c => c.friend.id === payload.new.sender_id)?.friend;
          if (senderProfile && payload.new.sender_id !== selectedFriend) {
            toast({
              title: "Nouveau message",
              description: `${senderProfile.pseudo} vous a envoyé un message`,
              duration: 3000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend, conversations, toast]);

  return (
    <div className="h-[600px] flex gap-4">
      <MemoizedConversationList 
        conversations={conversations}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />
      <MemoizedChatContainer 
        selectedFriend={selectedFriend}
        messages={messages}
        currentUserId={userId}
        friendName={selectedConversation?.friend.pseudo}
        onSendMessage={sendMessage}
      />
    </div>
  );
};