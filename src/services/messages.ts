import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/integrations/supabase/types/messages";

export const fetchUserMessages = async (userId: string, selectedFriend: string) => {
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

  if (error) throw error;
  return data as Message[];
};

export const markMessagesAsRead = async (userId: string, selectedFriend: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('sender_id', selectedFriend)
    .eq('receiver_id', userId)
    .eq('read', false);

  if (error) throw error;
};

export const subscribeToMessages = (
  userId: string, 
  selectedFriend: string,
  onNewMessage: (message: Message) => void
) => {
  return supabase
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
          const { data: profileData } = await supabase
            .from('profiles')
            .select('pseudo, image_profile')
            .eq('id', payload.new.sender_id)
            .single();

          const newMessage = {
            ...payload.new,
            profiles: profileData
          } as Message;
          
          onNewMessage(newMessage);
        } catch (error) {
          console.error('Error processing new message:', error);
        }
      }
    )
    .subscribe();
};