import { useState, useEffect } from 'react';
import { Message } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";
import { handleConnectionError, handleMessageUpdateError } from '@/utils/error-handling';
import { fetchUserMessages, markMessagesAsRead, subscribeToMessages } from '@/services/messages';
import { supabase } from "@/integrations/supabase/client";

export const useMessages = (
  userId: string, 
  selectedFriend: string | null,
  updateConversations: (friendId: string) => void
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedFriend) return;

    let retryCount = 0;
    const maxRetries = 3;
    let retryTimeout: NodeJS.Timeout;

    const fetchMessages = async () => {
      if (isConnecting) return;
      setIsConnecting(true);

      try {
        const data = await fetchUserMessages(userId, selectedFriend);
        setMessages(data);
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
        if (retryCount < maxRetries) {
          retryCount++;
          retryTimeout = setTimeout(() => {
            fetchMessages();
          }, 2000 * retryCount);
          return;
        }
        
        handleConnectionError();
      } finally {
        setIsConnecting(false);
      }
    };

    fetchMessages();

    const channel = subscribeToMessages(userId, selectedFriend, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);

      if (newMessage.sender_id === selectedFriend) {
        markMessagesAsRead(userId, selectedFriend)
          .then(() => updateConversations(selectedFriend))
          .catch(handleMessageUpdateError);
      }
    });

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [userId, selectedFriend, updateConversations, toast, isConnecting]);

  return messages;
};