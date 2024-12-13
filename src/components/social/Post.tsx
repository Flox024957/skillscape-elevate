import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PostProps {
  post: any;
  currentUserId: string;
}

export const Post = ({ post, currentUserId }: PostProps) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isLiked = post.post_likes?.some(
    (like: any) => like.user_id === currentUserId
  );

  const handleLike = async () => {
    try {
      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', currentUserId);
      } else {
        await supabase
          .from('post_likes')
          .insert([{ post_id: post.id, user_id: currentUserId }]);
      }
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de liker la publication",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await supabase
        .from('post_comments')
        .insert([{
          post_id: post.id,
          user_id: currentUserId,
          content: comment,
        }]);

      setComment('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.profiles?.image_profile} />
          <AvatarFallback>{post.profiles?.pseudo?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{post.profiles?.pseudo}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
              locale: fr,
            })}
          </p>
        </div>
      </div>

      <p className="text-foreground">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="rounded-lg max-h-96 w-full object-cover"
        />
      )}

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={isLiked ? "text-red-500" : ""}
          onClick={handleLike}
        >
          <Heart className="h-4 w-4 mr-2" />
          {post.post_likes?.length || 0}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {post.post_comments?.length || 0}
        </Button>
      </div>

      {showComments && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ajouter un commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[60px]"
            />
            <Button onClick={handleComment}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {post.post_comments?.map((comment: any) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.profiles?.image_profile} />
                  <AvatarFallback>{comment.profiles?.pseudo?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-accent rounded-lg p-3">
                    <p className="font-semibold text-sm">{comment.profiles?.pseudo}</p>
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
      )}
    </div>
  );
};