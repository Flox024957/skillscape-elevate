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
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedFriend) return;

    const fetchMessages = async () => {
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
          console.error('Error fetching messages:', error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les messages. Veuillez réessayer.",
            variant: "destructive",
          });
          return;
        }

        setMessages(data || []);

        // Mark messages as read
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
      } catch (error) {
        console.error('Error in fetchMessages:', error);
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion.",
          variant: "destructive",
        });
      }
    };

    fetchMessages();

    // Set up real-time subscription
    let channel = supabase
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
    };
  }, [userId, selectedFriend, updateConversations, toast]);

  return messages;
};