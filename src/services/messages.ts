import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/integrations/supabase/types/messages";

export const fetchUserMessages = async (userId: string, selectedFriend: string) => {
  try {
    console.log('Fetching messages for:', { userId, selectedFriend });
    
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
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .or(`sender_id.eq.${selectedFriend},receiver_id.eq.${selectedFriend}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    console.log('Messages fetched successfully:', data?.length || 0);
    return data as Message[];
  } catch (error) {
    console.error('Error in fetchUserMessages:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (userId: string, selectedFriend: string) => {
  try {
    console.log('Marking messages as read:', { userId, selectedFriend });
    
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .match({
        sender_id: selectedFriend,
        receiver_id: userId,
        read: false
      });

    if (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }

    console.log('Messages marked as read successfully');
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
    throw error;
  }
};

export const subscribeToMessages = (
  userId: string, 
  selectedFriend: string,
  onNewMessage: (message: Message) => void
) => {
  console.log('Setting up message subscription:', { userId, selectedFriend });
  
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
          console.log('New message received:', payload);
          
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