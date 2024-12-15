import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onToggleComments: () => void;
  postId: string;
  postUrl: string;
}

export const PostActions = ({ 
  isLiked, 
  likesCount, 
  commentsCount, 
  onLike, 
  onToggleComments,
  postId,
  postUrl
}: PostActionsProps) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

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

  return (
    <div className="flex items-center gap-4">
      <motion.div whileTap={{ scale: 0.9 }}>
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
            {/* Ajoutez d'autres options de partage ici */}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
};