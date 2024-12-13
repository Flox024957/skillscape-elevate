import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  profiles: {
    pseudo: string;
    image_profile: string;
  };
}

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

    // Subscribe to new messages
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
          receiver_id: userId, // For demo purposes, sending to self
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
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender_id === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender_id !== userId && (
                <Avatar className="h-8 w-8">
                  <img src={msg.profiles?.image_profile || '/placeholder.svg'} alt={msg.profiles?.pseudo} />
                </Avatar>
              )}
              <div className={`glass-panel p-3 max-w-[80%] ${
                msg.sender_id === userId ? 'bg-primary/20' : 'bg-muted/20'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 glass-panel"
          />
          <Button onClick={handleSendMessage} className="futuristic-button">
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};