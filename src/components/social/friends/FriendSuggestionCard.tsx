import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FriendSuggestionCardProps {
  friend: {
    id: string;
    pseudo: string;
    image_profile: string;
    current_job?: string;
  };
  onSendRequest: (friendId: string) => void;
  onDismiss: (friendId: string) => void;
}

export const FriendSuggestionCard = ({ friend, onSendRequest, onDismiss }: FriendSuggestionCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-4 hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/profile/${friend.id}`)}
          >
            <Avatar className="h-10 w-10 border-2 border-border">
              <AvatarImage src={friend.image_profile} />
              <AvatarFallback>
                {friend.pseudo?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{friend.pseudo}</p>
              {friend.current_job && (
                <p className="text-sm text-muted-foreground">
                  {friend.current_job}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSendRequest(friend.id)}
              className="hover:text-primary"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDismiss(friend.id)}
              className="hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};