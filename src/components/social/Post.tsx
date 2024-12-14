import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PostHeader } from './post/PostHeader';
import { PostActions } from './post/PostActions';
import { CommentSection } from './post/CommentSection';

interface PostProps {
  post: any;
  currentUserId: string;
}

export const Post = ({ post, currentUserId }: PostProps) => {
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

  const handleAddComment = async (content: string) => {
    try {
      await supabase
        .from('post_comments')
        .insert([{
          post_id: post.id,
          user_id: currentUserId,
          content,
        }]);

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
      <PostHeader 
        profile={post.profiles}
        createdAt={post.created_at}
      />

      <p className="text-foreground">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="rounded-lg max-h-96 w-full object-cover"
        />
      )}

      <PostActions
        isLiked={isLiked}
        likesCount={post.post_likes?.length || 0}
        commentsCount={post.post_comments?.length || 0}
        onLike={handleLike}
        onToggleComments={() => setShowComments(!showComments)}
      />

      {showComments && (
        <CommentSection
          comments={post.post_comments || []}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};