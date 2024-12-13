import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from 'lucide-react';

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
}

export const PostActions = ({ 
  isLiked, 
  likesCount, 
  commentsCount, 
  onLike, 
  onToggleComments 
}: PostActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className={isLiked ? "text-red-500" : ""}
        onClick={onLike}
      >
        <Heart className="h-4 w-4 mr-2" />
        {likesCount}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleComments}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {commentsCount}
      </Button>
    </div>
  );
};