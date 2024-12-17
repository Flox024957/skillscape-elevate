import { useState } from 'react';
import { useConversations } from './chat/use-conversations';
import { useMessages } from './chat/use-messages';
import { useMessageSender } from './chat/use-message-sender';

export const useChat = (userId: string) => {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const { conversations, setConversations, isError: isConversationsError } = useConversations(userId, selectedFriend);
  
  const updateConversations = (friendId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.friend.id === friendId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
  };

  const { messages, isError: isMessagesError } = useMessages(userId, selectedFriend, updateConversations);
  const { sendMessage, isError: isSendError } = useMessageSender();

  const handleSendMessage = async (content: string) => {
    if (selectedFriend) {
      await sendMessage(content, userId, selectedFriend);
    }
  };

  const isError = isConversationsError || isMessagesError || isSendError;

  return {
    messages,
    conversations,
    selectedFriend,
    setSelectedFriend,
    sendMessage: handleSendMessage,
    isError
  };
};