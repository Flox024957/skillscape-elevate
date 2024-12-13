import { useChat } from "@/hooks/use-chat";
import { ConversationList } from './chat/ConversationList';
import { ChatContainer } from './chat/ChatContainer';

interface ChatSectionProps {
  userId: string;
}

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const { messages, conversations, selectedFriend, setSelectedFriend, sendMessage } = useChat(userId);
  const selectedConversation = conversations.find(c => c.friend.id === selectedFriend);

  return (
    <div className="h-[600px] flex gap-4">
      <ConversationList 
        conversations={conversations}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />
      <ChatContainer 
        selectedFriend={selectedFriend}
        messages={messages}
        currentUserId={userId}
        friendName={selectedConversation?.friend.pseudo}
        onSendMessage={sendMessage}
      />
    </div>
  );
};