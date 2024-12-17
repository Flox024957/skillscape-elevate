import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ChatConversation } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";
import { handleConnectionError } from '@/utils/error-handling';

interface UseConversationsReturn {
  conversations: ChatConversation[];
  setConversations: React.Dispatch<React.SetStateAction<ChatConversation[]>>;
  isError: boolean;
}

export const useConversations = (userId: string, selectedFriend: string | null): UseConversationsReturn => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    let retryTimeout: NodeJS.Timeout;

    const fetchConversations = async () => {
      if (isConnecting) return;
      setIsConnecting(true);

      try {
        const { data: friendships, error: friendshipsError } = await supabase
          .from('friendships')
          .select(`
            friend:profiles!friendships_friend_id_fkey (
              id,
              pseudo,
              image_profile
            )
          `)
          .eq('user_id', userId)
          .eq('status', 'accepted');

        if (friendshipsError) {
          if (friendshipsError.code === '503') {
            handleConnectionError();
            setIsError(true);
            return;
          }
          console.error('Error fetching friendships:', friendshipsError);
          return;
        }

        const conversationsWithDetails = await Promise.all(
          friendships.map(async (f) => {
            try {
              const { data: messages } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${userId},receiver_id.eq.${f.friend.id}),and(sender_id.eq.${f.friend.id},receiver_id.eq.${userId})`)
                .order('created_at', { ascending: false })
                .limit(1);

              const { count: unreadCount } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('sender_id', f.friend.id)
                .eq('receiver_id', userId)
                .eq('read', false);

              return {
                friend: f.friend,
                lastMessage: messages && messages.length > 0 ? {
                  content: messages[0].content,
                  created_at: messages[0].created_at
                } : null,
                unreadCount: unreadCount || 0
              };
            } catch (error: any) {
              if (error?.code === '503') {
                return {
                  friend: f.friend,
                  lastMessage: null,
                  unreadCount: 0
                };
              }
              throw error;
            }
          })
        );

        setConversations(conversationsWithDetails);
        setIsError(false);
        retryCount = 0;
      } catch (error: any) {
        console.error('Error in fetchConversations:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          retryTimeout = setTimeout(() => {
            fetchConversations();
          }, 2000 * retryCount);
        } else {
          handleConnectionError();
          setIsError(true);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    fetchConversations();

    const channel = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        async (payload) => {
          const senderId = payload.new.sender_id;
          setConversations(prev => prev.map(conv => {
            if (conv.friend.id === senderId) {
              return {
                ...conv,
                lastMessage: {
                  content: payload.new.content,
                  created_at: payload.new.created_at
                },
                unreadCount: selectedFriend === senderId ? 0 : conv.unreadCount + 1
              };
            }
            return conv;
          }));

          if (senderId !== selectedFriend) {
            const sender = conversations.find(c => c.friend.id === senderId)?.friend;
            if (sender) {
              toast({
                title: "Nouveau message",
                description: `${sender.pseudo} vous a envoyé un message`,
                duration: 3000,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend, conversations, toast, isConnecting]);

  return { conversations, setConversations, isError };
};