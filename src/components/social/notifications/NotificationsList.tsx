import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from '@/hooks/use-notifications';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface NotificationsListProps {
  userId: string;
}

export const NotificationsList = ({ userId }: NotificationsListProps) => {
  const navigate = useNavigate();
  const { notifications, isLoading, markAsRead } = useNotifications(userId);
  
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleNotificationClick = async (notification: any) => {
    await markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">
            Chargement...
          </div>
        ) : notifications?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Aucune notification
          </div>
        ) : (
          notifications?.map((notification: any) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-4 cursor-pointer ${!notification.read ? 'bg-accent/50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="space-y-1">
                <p className="text-sm">{notification.content}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                    locale: fr
                  })}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};