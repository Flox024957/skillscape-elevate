import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Message } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";

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
          if (retryCount < maxRetries) {
            retryCount++;
            retryTimeout = setTimeout(() => {
              fetchMessages();
            }, 2000 * retryCount);
            return;
          }
          
          console.error('Error fetching messages:', error);
          toast({
            title: "Problème de connexion",
            description: "Le serveur est temporairement indisponible. Veuillez réessayer plus tard.",
            variant: "destructive",
          });
          return;
        }

        setMessages(data || []);
        retryCount = 0;

        if (data && data.length > 0) {
          try {
            await supabase
              .from('messages')
              .update({ read: true })
              .eq('sender_id', selectedFriend)
              .eq('receiver_id', userId)
              .eq('read', false);

            updateConversations(selectedFriend);
          } catch (updateError) {
            console.error('Error updating message read status:', updateError);
          }
        }
      } catch (error) {
        console.error('Error in fetchMessages:', error);
      } finally {
        setIsConnecting(false);
      }
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
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('pseudo, image_profile')
              .eq('id', payload.new.sender_id)
              .single();

            if (profileError) {
              console.error('Error fetching profile:', profileError);
              return;
            }

            const newMessage: Message = {
              ...payload.new as Message,
              profiles: profileData
            };
            
            setMessages(prev => [...prev, newMessage]);

            if (payload.new.sender_id === selectedFriend) {
              try {
                await supabase
                  .from('messages')
                  .update({ read: true })
                  .eq('id', payload.new.id);

                updateConversations(selectedFriend);
              } catch (error) {
                console.error('Error updating message status:', error);
              }
            }
          } catch (error) {
            console.error('Error processing new message:', error);
          }
        }
      )
      .subscribe();

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