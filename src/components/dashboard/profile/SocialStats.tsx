import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SocialStatsProps {
  friendsCount: number;
  onSignOut: () => Promise<void>;
}

export const SocialStats = ({ friendsCount, onSignOut }: SocialStatsProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex gap-4">
      <Button
        variant="ghost"
        size={isMobile ? "default" : "default"}
        className={cn(
          "flex gap-3 flex-1 h-12",
          "hover:bg-primary/10 hover:text-primary",
          "transform hover:scale-[1.02] transition-all duration-300"
        )}
        onClick={() => navigate("/friends")}
      >
        <Users className={cn("h-4 w-4", isMobile && "h-4 w-4")} />
        <Badge 
          variant="secondary" 
          className="px-2 py-1 hover:bg-primary/20"
        >
          {friendsCount}
        </Badge>
      </Button>
      <Button
        variant="ghost"
        size={isMobile ? "default" : "default"}
        className={cn(
          "flex gap-3 flex-1 h-12",
          "hover:bg-primary/10 hover:text-primary",
          "transform hover:scale-[1.02] transition-all duration-300"
        )}
        onClick={() => navigate("/messages")}
      >
        <MessageCircle className={cn("h-4 w-4", isMobile && "h-4 w-4")} />
        Messages
      </Button>
      {isMobile && (
        <Button
          variant="ghost"
          size="default"
          className={cn(
            "flex gap-3 flex-1 h-12 px-3",
            "hover:bg-primary/10 hover:text-primary",
            "transform hover:scale-[1.02] transition-all duration-300"
          )}
          onClick={onSignOut}
        >
          Déconnexion
        </Button>
      )}
    </div>
  );
};