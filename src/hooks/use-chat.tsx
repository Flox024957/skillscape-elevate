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
          console.error('Error fetching friendships:', friendshipsError);
          toast({
            title: "Erreur",
            description: "Impossible de charger vos conversations",
            variant: "destructive",
          });
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
      } catch (error) {
        console.error('Error in fetchConversations:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des conversations",
          variant: "destructive",
        });
      }
    };

    fetchConversations();
  }, [userId, selectedFriend, toast]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedFriend) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
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
          toast({
            title: "Erreur",
            description: "Impossible de charger les messages",
            variant: "destructive",
          });
          return;
        }

        // Filter messages to only include those between the current user and selected friend
        const filteredMessages = data.filter(msg => 
          (msg.sender_id === userId && msg.receiver_id === selectedFriend) ||
          (msg.sender_id === selectedFriend && msg.receiver_id === userId)
        );

        setMessages(filteredMessages as Message[]);
      } catch (error) {
        console.error('Error in fetchMessages:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des messages",
          variant: "destructive",
        });
      }
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
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('pseudo, image_profile')
              .eq('id', payload.new.sender_id)
              .single();

            const newMessage: Message = {
              ...payload.new as Message,
              profiles: profileData
            };
            
            setMessages((prev) => [...prev, newMessage]);
          } catch (error) {
            console.error('Error handling new message:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend, toast]);

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
        console.error('Error sending message:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
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