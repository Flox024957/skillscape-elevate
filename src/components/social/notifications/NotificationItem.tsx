import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Bell, MessageCircle, Heart, UserPlus } from "lucide-react";

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    content: string;
    created_at: string;
    read: boolean;
    link?: string;
    sender?: {
      pseudo: string;
      image_profile: string;
    };
  };
  onRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onRead }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'friend_request':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 ${notification.read ? 'opacity-60' : 'bg-accent/50'}`}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 h-auto py-2"
        onClick={() => onRead(notification.id)}
      >
        {notification.sender ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={notification.sender.image_profile} />
            <AvatarFallback>
              {notification.sender.pseudo[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            {getIcon()}
          </div>
        )}
        <div className="flex-1 text-left">
          <p className="text-sm">{notification.content}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.created_at), {
              addSuffix: true,
              locale: fr
            })}
          </p>
        </div>
        {!notification.read && (
          <div className="h-2 w-2 rounded-full bg-primary" />
        )}
      </Button>
    </motion.div>
  );
};