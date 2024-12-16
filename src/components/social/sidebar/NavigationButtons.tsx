import { Button } from "@/components/ui/button";
import { Users, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentUser: any;
}

export const NavigationButtons = ({ currentUser }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="space-y-2">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start",
          location.pathname === '/friends' && "bg-primary/10"
        )}
        onClick={() => navigate('/friends')}
      >
        <Users className="mr-2 h-4 w-4" />
        Amis
      </Button>
      
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start",
          location.pathname === '/messages' && "bg-primary/10"
        )}
        onClick={() => navigate('/messages')}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Messages
      </Button>
      
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start",
          location.pathname.startsWith('/profile') && "bg-primary/10"
        )}
        onClick={() => navigate(`/profile/${currentUser?.id}`)}
      >
        <User className="mr-2 h-4 w-4" />
        Mon profil
      </Button>
    </div>
  );
};