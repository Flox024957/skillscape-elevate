import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PostHeader } from './post/PostHeader';
import { PostActions } from './post/PostActions';
import { CommentSection } from './post/CommentSection';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const channel = supabase
      .channel('post_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
          filter: `post_id=eq.${post.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [post.id, queryClient]);

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

  const handleAddComment = async (content: string, parentId?: string) => {
    try {
      await supabase
        .from('post_comments')
        .insert([{
          post_id: post.id,
          user_id: currentUserId,
          content,
          parent_id: parentId
        }]);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      if (parentId) {
        toast({
          title: "Succès",
          description: "Réponse ajoutée",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-card/50 backdrop-blur-sm rounded-lg p-4 space-y-4 border border-border/50"
    >
      <PostHeader 
        profile={post.profiles}
        createdAt={post.created_at}
      />

      <p className="text-foreground whitespace-pre-wrap">{post.content}</p>

      {post.image_url && (
        <div className="relative w-full h-[300px]">
          <img
            src={post.image_url}
            alt="Post"
            className="rounded-lg w-full h-full object-cover"
            loading="lazy"
          />
        </div>
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
    </motion.div>
  );
};