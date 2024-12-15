import { Avatar } from "@/components/ui/avatar";
import { NotificationsList } from '../notifications/NotificationsList';

interface ProfileSectionProps {
  currentUser: any;
}

export const ProfileSection = ({ currentUser }: ProfileSectionProps) => {
  if (!currentUser) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar className="w-12 h-12">
          <img 
            src={currentUser.image_profile || '/placeholder.svg'} 
            alt={currentUser.pseudo || 'Profile'} 
            className="object-cover"
          />
        </Avatar>
        <div>
          <h3 className="font-medium">{currentUser.pseudo}</h3>
          <p className="text-sm text-muted-foreground">{currentUser.current_job}</p>
        </div>
      </div>
      <NotificationsList userId={currentUser.id} />
    </div>
  );
};