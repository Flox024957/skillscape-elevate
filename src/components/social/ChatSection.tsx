import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Message } from '@/integrations/supabase/types/messages';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';

interface ChatSectionProps {
  userId: string;
}

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:sender_id (
            pseudo,
            image_profile
          )
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
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
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: message,
          sender_id: userId,
          receiver_id: userId,
        },
      ]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
      return;
    }

    setMessage('');
  };

  return (
    <div className="h-[600px] flex flex-col glass-panel">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold neon-text">Messages</h2>
      </div>
      
      <MessageList messages={messages} currentUserId={userId} />
      <MessageInput 
        message={message}
        onChange={setMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
};