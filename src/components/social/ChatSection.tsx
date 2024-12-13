import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Message, ChatConversation } from '@/integrations/supabase/types/messages';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatSectionProps {
  userId: string;
}

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const [message, setMessage] = useState('');
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
        unreadCount: 0
      }));

      setConversations(conversations);
      if (conversations.length > 0 && !selectedFriend) {
        setSelectedFriend(conversations[0].friend.id);
      }
    };

    fetchConversations();
  }, [userId]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedFriend) return;

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
          
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedFriend]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedFriend) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: message,
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
      return;
    }

    setMessage('');
  };

  return (
    <div className="h-[600px] flex gap-4">
      {/* Conversations list */}
      <div className="w-1/3 glass-panel">
        <div className="p-4 border-b border-border/50">
          <h2 className="font-semibold neon-text">Conversations</h2>
        </div>
        <ScrollArea className="h-[calc(600px-65px)]">
          <div className="p-2 space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.friend.id}
                onClick={() => setSelectedFriend(conv.friend.id)}
                className={cn(
                  "w-full p-3 flex items-center gap-3 rounded-lg transition-colors",
                  selectedFriend === conv.friend.id
                    ? "bg-primary/20"
                    : "hover:bg-muted/20"
                )}
              >
                <Avatar>
                  <AvatarImage src={conv.friend.image_profile || undefined} />
                  <AvatarFallback>{conv.friend.pseudo?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{conv.friend.pseudo}</p>
                  {conv.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage.content}
                    </p>
                  )}
                </div>
                {conv.unreadCount > 0 && (
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Messages */}
      <div className="flex-1 glass-panel">
        {selectedFriend ? (
          <>
            <div className="p-4 border-b border-border/50">
              <h2 className="font-semibold neon-text">
                {conversations.find(c => c.friend.id === selectedFriend)?.friend.pseudo}
              </h2>
            </div>
            <MessageList messages={messages} currentUserId={userId} />
            <MessageInput 
              message={message}
              onChange={setMessage}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Sélectionnez une conversation pour commencer
          </div>
        )}
      </div>
    </div>
  );
};