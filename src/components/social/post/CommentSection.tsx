import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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
  onAddComment: (content: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onAddComment(comment);
    setComment('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[60px] bg-background/50 backdrop-blur-sm border-[#8B5CF6]/30 
                     focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/50"
        />
        <Button 
          onClick={handleSubmit}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_15px_rgba(139,92,246,0.3)]
                   hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar className="w-8 h-8 border border-[#8B5CF6]/30">
              <AvatarImage src={comment.profiles?.image_profile} />
              <AvatarFallback>{comment.profiles?.pseudo?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-[#8B5CF6]/10 backdrop-blur-sm rounded-lg p-3 border border-[#8B5CF6]/30">
                <p className="font-semibold text-sm text-[#8B5CF6]">{comment.profiles?.pseudo}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};