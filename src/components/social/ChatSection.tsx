import { useChat } from "@/hooks/use-chat";
import { ConversationList } from './chat/ConversationList';
import { ChatContainer } from './chat/ChatContainer';
import { memo, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatSectionProps {
  userId: string;
}

const MemoizedConversationList = memo(ConversationList);
const MemoizedChatContainer = memo(ChatContainer);

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const { messages, conversations, selectedFriend, setSelectedFriend, sendMessage, isError } = useChat(userId);
  const selectedConversation = conversations.find(c => c.friend.id === selectedFriend);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showConversations, setShowConversations] = useState(!selectedFriend);

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

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriend(friendId);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBack = () => {
    setShowConversations(true);
    setSelectedFriend(null);
  };

  if (!isMobile) {
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
          isError={isError}
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)]">
      {showConversations ? (
        <MemoizedConversationList 
          conversations={conversations}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
      ) : (
        <MemoizedChatContainer 
          selectedFriend={selectedFriend}
          messages={messages}
          currentUserId={userId}
          friendName={selectedConversation?.friend.pseudo}
          onSendMessage={sendMessage}
          onBack={handleBack}
          isError={isError}
        />
      )}
    </div>
  );
};