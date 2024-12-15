import { FriendSuggestionCard } from "./FriendSuggestionCard";

interface FriendSuggestionListProps {
  suggestions: any[];
  onSendRequest: (friendId: string) => void;
  onDismiss: (friendId: string) => void;
}

export const FriendSuggestionList = ({ 
  suggestions, 
  onSendRequest, 
  onDismiss 
}: FriendSuggestionListProps) => {
  if (!suggestions?.length) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Aucune suggestion pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {suggestions.map((suggestion) => (
        <FriendSuggestionCard
          key={suggestion.suggested_friend_id}
          friend={suggestion.profiles}
          onSendRequest={() => onSendRequest(suggestion.suggested_friend_id)}
          onDismiss={() => onDismiss(suggestion.suggested_friend_id)}
        />
      ))}
    </div>
  );
};