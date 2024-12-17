import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Message, ChatConversation } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch conversations
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

      const conversations = friendships.map(f => ({
        friend: f.friend,
        unreadCount: 0,
        lastMessage: undefined
      }));

      setConversations(conversations);
      if (conversations.length > 0 && !selectedFriend) {
        setSelectedFriend(conversations[0].friend.id);
      }
    };

    fetchConversations();
  }, [userId, selectedFriend]);

  // Fetch messages and subscribe to real-time updates
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
    };

    fetchMessages();

    // Subscribe to new messages
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedFriend) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content,
          sender_id: userId,
          receiver_id: selectedFriend,
        },
      ]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    conversations,
    selectedFriend,
    setSelectedFriend,
    sendMessage
  };
};