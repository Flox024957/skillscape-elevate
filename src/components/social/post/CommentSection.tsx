import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    pseudo: string;
    image_profile: string;
  };
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [comment, setComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddComment(comment, replyingTo);
      setComment('');
      setReplyingTo(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[60px] bg-background/50 backdrop-blur-sm"
        />
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !comment.trim()}
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        <div className="space-y-3">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start gap-3"
            >
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
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Répondre
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};