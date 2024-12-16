import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

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
    <div className="text-center relative bg-background/60 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <Avatar className="h-24 w-24 mx-auto border-4 border-primary">
        <AvatarImage 
          src={profile.image_profile || '/placeholder.svg'} 
          alt={profile.pseudo} 
          className="object-cover"
        />
        <AvatarFallback>{profile.pseudo?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <h2 className="text-2xl font-bold mt-4">{profile.pseudo}</h2>
      
      {profile.description && (
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          {profile.description}
        </p>
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