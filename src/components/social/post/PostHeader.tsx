import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PostHeaderProps {
  profile: {
    pseudo: string;
    image_profile: string;
  };
  createdAt: string;
}

export const PostHeader = ({ profile, createdAt }: PostHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={profile.image_profile} />
        <AvatarFallback>{profile.pseudo?.[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{profile.pseudo}</h3>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            locale: fr,
          })}
        </p>
      </div>
    </div>
  );
};