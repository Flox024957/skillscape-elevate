import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PostHeader } from './post/PostHeader';
import { PostActions } from './post/PostActions';
import { CommentSection } from './post/CommentSection';
import { motion } from 'framer-motion';
import { FileIcon, FileTextIcon, ImageIcon, MusicIcon, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostProps {
  post: any;
  currentUserId: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.startsWith('video/')) return VideoIcon;
  if (type.startsWith('audio/')) return MusicIcon;
  if (type.startsWith('text/')) return FileTextIcon;
  return FileIcon;
};

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

  const FileAttachment = () => {
    if (!post.attachment_url || !post.attachment_type) return null;
    
    const Icon = getFileIcon(post.attachment_type);
    const fileName = post.attachment_url.split('/').pop();

    return (
      <Button
        variant="outline"
        className="w-full justify-start gap-2 bg-background/50"
        onClick={() => window.open(post.attachment_url, '_blank')}
      >
        <Icon className="h-4 w-4" />
        <span className="truncate">{fileName}</span>
      </Button>
    );
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

      <FileAttachment />

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