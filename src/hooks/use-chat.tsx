import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Message, ChatConversation, Friend } from '@/types/skills';
import { useToast } from "@/hooks/use-toast";

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
      const { data: friendships, error } = await supabase
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

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      const conversationsData: ChatConversation[] = friendships.map(f => ({
        friend: f.friend as Friend,
        unreadCount: 0,
        lastMessage: undefined
      }));

      setConversations(conversationsData);
    };

    fetchConversations();
  }, [userId]);

  useEffect(() => {
    if (!selectedFriend) {
      setMessages([]);
      return;
    }

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

      const typedMessages = data.map(msg => ({
        ...msg,
        profiles: msg.profiles ? {
          pseudo: msg.profiles.pseudo,
          image_profile: msg.profiles.image_profile
        } : null
      })) as Message[];

      setMessages(typedMessages);
    };

    fetchMessages();
  }, [userId, selectedFriend]);

  const sendMessage = async (content: string) => {
    if (!selectedFriend || !content.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: userId,
          receiver_id: selectedFriend,
          content: content.trim(),
        }
      ]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
      console.error('Error sending message:', error);
      return;
    }
  };

  return {
    messages,
    conversations,
    selectedFriend,
    setSelectedFriend,
    sendMessage,
  };
};