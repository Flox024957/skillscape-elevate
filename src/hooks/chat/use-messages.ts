import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Message } from '@/integrations/supabase/types/messages';

export const useMessages = (
  userId: string, 
  selectedFriend: string | null,
  updateConversations: (friendId: string) => void
) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!selectedFriend) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          read,
          created_at,
          profiles!messages_sender_id_fkey (
            pseudo,
            image_profile
          )
        `)
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${selectedFriend}),and(sender_id.eq.${selectedFriend},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data as Message[]);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', selectedFriend)
        .eq('receiver_id', userId)
        .eq('read', false);

      updateConversations(selectedFriend);
    };

    fetchMessages();

    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${userId},receiver_id.eq.${selectedFriend}),and(sender_id.eq.${selectedFriend},receiver_id.eq.${userId}))`
        },
        async (payload) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('pseudo, image_profile')
            .eq('id', payload.new.sender_id)
            .single();

          const newMessage: Message = {
            ...payload.new as Message,
            profiles: profileData
          };
          
          setMessages(prev => [...prev, newMessage]);

          if (payload.new.sender_id === selectedFriend) {
            await supabase
              .from('messages')
              .update({ read: true })
              .eq('id', payload.new.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend]);

  return messages;
};