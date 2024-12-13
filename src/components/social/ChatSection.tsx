import { useChat } from "@/hooks/use-chat";
import { ConversationList } from './chat/ConversationList';
import { ChatContainer } from './chat/ChatContainer';
import { memo } from 'react';

interface ChatSectionProps {
  userId: string;
}

const MemoizedConversationList = memo(ConversationList);
const MemoizedChatContainer = memo(ChatContainer);

export const ChatSection = ({ userId }: ChatSectionProps) => {
  const { messages, conversations, selectedFriend, setSelectedFriend, sendMessage } = useChat(userId);
  const selectedConversation = conversations.find(c => c.friend.id === selectedFriend);

  return (
    <div className="h-[600px] flex gap-4">
      <MemoizedConversationList 
        conversations={conversations}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />
      <MemoizedChatContainer 
        selectedFriend={selectedFriend}
        messages={messages}
        currentUserId={userId}
        friendName={selectedConversation?.friend.pseudo}
        onSendMessage={sendMessage}
      />
    </div>
  );
};