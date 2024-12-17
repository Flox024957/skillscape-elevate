import { useState, useEffect } from 'react';
import { Message } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";
import { handleConnectionError, handleMessageUpdateError } from '@/utils/error-handling';
import { fetchUserMessages, markMessagesAsRead, subscribeToMessages } from '@/services/messages';
import { supabase } from "@/integrations/supabase/client";

interface UseMessagesReturn {
  messages: Message[];
  isError: boolean;
}

export const useMessages = (
  userId: string, 
  selectedFriend: string | null,
  updateConversations: (friendId: string) => void
): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isError, setIsError] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedFriend) return;

    let retryCount = 0;
    const maxRetries = 3;
    let retryTimeout: NodeJS.Timeout;

    const loadMessages = async () => {
      if (isConnecting) return;
      setIsConnecting(true);

      try {
        const data = await fetchUserMessages(userId, selectedFriend);
        setMessages(data);
        setIsError(false);
        retryCount = 0;

        if (data.length > 0) {
          try {
            await markMessagesAsRead(userId, selectedFriend);
            updateConversations(selectedFriend);
          } catch (error) {
            handleMessageUpdateError(error);
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          retryTimeout = setTimeout(() => {
            loadMessages();
          }, 2000 * retryCount);
        } else {
          handleConnectionError();
          setIsError(true);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    loadMessages();

    const channel = subscribeToMessages(userId, selectedFriend, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);

      if (newMessage.sender_id === selectedFriend) {
        markMessagesAsRead(userId, selectedFriend)
          .then(() => updateConversations(selectedFriend))
          .catch(handleMessageUpdateError);
      }
    });

    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend, updateConversations, toast, isConnecting]);

  return { messages, isError };
};