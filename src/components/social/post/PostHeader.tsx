import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface PostHeaderProps {
  profile: {
    id: string;
    pseudo: string;
    image_profile: string;
  };
  createdAt: string;
  isCurrentUser?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const PostHeader = ({ profile, createdAt, isCurrentUser, onDelete, onEdit }: PostHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate(`/profile/${profile.id}`)}>
          <AvatarImage src={profile.image_profile} />
          <AvatarFallback>{profile.pseudo?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 
            className="font-semibold hover:text-primary cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            {profile.pseudo}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: fr,
            })}
          </p>
        </div>
      </div>

      {isCurrentUser && (onDelete || onEdit) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {onEdit && (
              <DropdownMenuItem onClick={onEdit}>
                Modifier
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-500 focus:text-red-500"
              >
                Supprimer
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};