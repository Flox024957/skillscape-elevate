import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit, Camera } from "lucide-react";

interface ProfileHeaderProps {
  isCurrentUser: boolean;
  profile: {
    pseudo: string;
    image_profile: string | null;
    description: string | null;
  };
  onUpdateAvatar?: () => void;
}

export const ProfileHeader = ({ isCurrentUser, profile, onUpdateAvatar }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center relative">
      <div className="relative inline-block">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src={profile.image_profile || '/placeholder.svg'} alt={profile.pseudo} />
          <AvatarFallback>{profile.pseudo?.[0]}</AvatarFallback>
        </Avatar>
        {isCurrentUser && onUpdateAvatar && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0"
            onClick={onUpdateAvatar}
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>
      <h2 className="text-xl font-semibold mt-4">{profile.pseudo}</h2>
      {profile.description && (
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">{profile.description}</p>
      )}
      {isCurrentUser && (
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={() => navigate('/edit-profile')}
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier le profil
        </Button>
      )}
    </div>
  );
};