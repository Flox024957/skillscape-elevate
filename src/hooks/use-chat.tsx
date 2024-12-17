import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Message, ChatConversation } from '@/integrations/supabase/types/messages';
import { useToast } from "@/hooks/use-toast";

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch conversations and subscribe to updates
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

      // Fetch last message and unread count for each friend
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
      if (conversationsWithDetails.length > 0 && !selectedFriend) {
        setSelectedFriend(conversationsWithDetails[0].friend.id);
      }
    };

    fetchConversations();

    // Subscribe to new messages for conversation updates
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
          // Update conversations list with new message
          const senderId = payload.new.sender_id;
          setConversations(prev => prev.map(conv => {
            if (conv.friend.id === senderId) {
              return {
                ...conv,
                lastMessage: payload.new,
                unreadCount: conv.unreadCount + 1
              };
            }
            return conv;
          }));

          // Show notification if not in the current conversation
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

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', selectedFriend)
        .eq('receiver_id', userId)
        .eq('read', false);

      // Update unread count in conversations
      setConversations(prev => prev.map(conv => {
        if (conv.friend.id === selectedFriend) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      }));
    };

    fetchMessages();

    // Subscribe to new messages in the current conversation
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

          // Mark message as read if it's in the current conversation
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

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedFriend) return;

    try {
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
    } catch (error) {
      console.error('Error sending message:', error);
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