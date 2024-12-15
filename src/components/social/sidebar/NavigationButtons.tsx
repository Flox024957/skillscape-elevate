import { Button } from "@/components/ui/button";
import { Users, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <Button 
        variant="ghost" 
        className="w-full justify-start" 
        onClick={() => navigate('/friends')}
      >
        <Users className="mr-2 h-4 w-4" />
        Amis
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start"
        onClick={() => navigate('/messages')}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Messages
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start"
        onClick={() => navigate(`/profile/${currentUser?.id}`)}
      >
        <User className="mr-2 h-4 w-4" />
        Mon profil
      </Button>
    </div>
  );
};