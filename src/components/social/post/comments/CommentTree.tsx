import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  profiles: {
    pseudo: string;
    image_profile: string;
  };
}

interface CommentTreeProps {
  comment: Comment;
  replies: Comment[];
  level?: number;
  onReply: (commentId: string) => void;
  replyingTo: string | null;
}

export const CommentTree = ({ 
  comment, 
  replies, 
  level = 0, 
  onReply,
  replyingTo
}: CommentTreeProps) => {
  const marginClass = level > 0 ? 'ml-8' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`space-y-2 ${marginClass}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.profiles?.image_profile} />
          <AvatarFallback>{comment.profiles?.pseudo?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-accent/50 backdrop-blur-sm rounded-lg p-3">
            <p className="font-semibold text-sm">{comment.profiles?.pseudo}</p>
            <p className="text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
              onClick={() => onReply(comment.id)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Répondre
            </Button>
          </div>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="space-y-2">
          {replies.map(reply => (
            <CommentTree
              key={reply.id}
              comment={reply}
              replies={[]}
              level={level + 1}
              onReply={onReply}
              replyingTo={replyingTo}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};