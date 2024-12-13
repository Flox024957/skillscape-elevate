import { useState } from 'react';
import { Message } from '@/integrations/supabase/types/messages';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatContainerProps {
  selectedFriend: string | null;
  messages: Message[];
  currentUserId: string;
  friendName?: string | null;
  onSendMessage: (content: string) => void;
}

export const ChatContainer = ({
  selectedFriend,
  messages,
  currentUserId,
  friendName,
  onSendMessage
}: ChatContainerProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 glass-panel">
      {selectedFriend ? (
        <>
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold neon-text">{friendName}</h2>
          </div>
          <MessageList messages={messages} currentUserId={currentUserId} />
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
  );
};