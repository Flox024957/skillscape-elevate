import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ChatConversation } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";

export const useConversations = (userId: string, selectedFriend: string | null) => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
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
        console.error('Error fetching friendships:', friendshipsError);
        return;
      }

      const conversationsWithDetails = await Promise.all(
        friendships.map(async (f) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${userId},receiver_id.eq.${f.friend.id}),and(sender_id.eq.${f.friend.id},receiver_id.eq.${userId})`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('sender_id', f.friend.id)
            .eq('receiver_id', userId)
            .eq('read', false);

          return {
            friend: f.friend,
            lastMessage,
            unreadCount: unreadCount || 0
          };
        })
      );

      setConversations(conversationsWithDetails);
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
                unreadCount: conv.unreadCount + 1
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
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend, toast]);

  return { conversations, setConversations };
};