import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  isCurrentUser: boolean;
  profile: {
    pseudo: string;
    image_profile: string | null;
    description: string | null;
  };
}

export const ProfileHeader = ({ isCurrentUser, profile }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <Avatar className="h-24 w-24 mx-auto">
        <img src={profile.image_profile || '/placeholder.svg'} alt={profile.pseudo} />
      </Avatar>
      <h2 className="text-xl font-semibold mt-2">{profile.pseudo}</h2>
      {profile.description && (
        <p className="text-muted-foreground">{profile.description}</p>
      )}
      {isCurrentUser && (
        <Button 
          className="w-full mt-4" 
          variant="outline"
          onClick={() => navigate('/edit-profile')}
        >
          Modifier le profil
        </Button>
      )}
    </div>
  );
};