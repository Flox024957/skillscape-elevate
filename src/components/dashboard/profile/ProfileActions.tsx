import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileActionsProps {
  onSignOut: () => Promise<void>;
}

export const ProfileActions = ({ onSignOut }: ProfileActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex gap-4">
      <Button 
        variant="outline" 
        onClick={() => navigate("/main")}
        className="hover:scale-105 transition-transform duration-300"
      >
        Explorer
      </Button>
      <Button 
        variant="outline" 
        onClick={onSignOut}
        className="hover:scale-105 transition-transform duration-300"
      >
        Déconnexion
      </Button>
    </div>
  );
};