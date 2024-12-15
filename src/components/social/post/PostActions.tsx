import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
  postId: string;
  postUrl: string;
  userId: string;
}

export const PostActions = ({ 
  isLiked, 
  likesCount, 
  commentsCount, 
  onLike, 
  onToggleComments,
  postId,
  postUrl,
  userId
}: PostActionsProps) => {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<'like' | 'love' | 'dislike' | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast({
        title: "Lien copié",
        description: "Le lien de la publication a été copié dans le presse-papier",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isBookmarked ? 
        "La publication a été retirée de vos favoris" : 
        "La publication a été ajoutée à vos favoris",
    });
  };

  const handleReport = async () => {
    toast({
      title: "Signalement envoyé",
      description: "Merci de nous avoir signalé ce contenu. Nous allons l'examiner.",
    });
  };

  const handleReaction = (type: 'like' | 'love' | 'dislike') => {
    setReaction(type);
    setShowReactions(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="sm"
            className={`${isLiked ? "text-red-500" : ""} transition-colors duration-200`}
            onClick={onLike}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {likesCount}
          </Button>
          
          {showReactions && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -mt-12 bg-background border rounded-full p-1 flex gap-1"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-red-500"
                onClick={() => handleReaction('love')}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:text-blue-500"
                onClick={() => handleReaction('like')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:text-orange-500"
                onClick={() => handleReaction('dislike')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <motion.div whileTap={{ scale: 0.9 }}>
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

      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`transition-colors duration-200 ${isBookmarked ? "text-yellow-500" : ""}`}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
        </Button>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="transition-colors duration-200 hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleShare}>
            Copier le lien
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReport}>
            <Flag className="h-4 w-4 mr-2" />
            Signaler
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};