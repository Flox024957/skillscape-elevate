import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
  onShare?: () => void;
}

export const PostActions = ({ 
  isLiked, 
  likesCount, 
  commentsCount, 
  onLike, 
  onToggleComments,
  onShare
}: PostActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className={`${isLiked ? "text-red-500" : ""} transition-colors duration-200`}
          onClick={onLike}
        >
          <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
          {likesCount}
        </Button>
      </motion.div>
      
      <motion.div
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleComments}
          className="transition-colors duration-200 hover:text-primary"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {commentsCount}
        </Button>
      </motion.div>

      {onShare && (
        <motion.div
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="transition-colors duration-200 hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};