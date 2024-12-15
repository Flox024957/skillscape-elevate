import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PostHeader } from './post/PostHeader';
import { PostActions } from './post/PostActions';
import { CommentSection } from './post/CommentSection';
import { motion, AnimatePresence } from 'framer-motion';
import { FileIcon, FileTextIcon, ImageIcon, MusicIcon, VideoIcon, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from '@/components/ui/badge';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isLiked = post.post_likes?.some(
    (like: any) => like.user_id === currentUserId
  );

  const postUrl = `${window.location.origin}/post/${post.id}`;
  const shouldTruncate = post.content.length > 280;

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

  const renderContent = () => {
    if (!shouldTruncate || isExpanded) {
      return post.content;
    }
    return (
      <>
        {post.content.slice(0, 280)}...
        <Button 
          variant="link" 
          className="px-1 h-auto" 
          onClick={() => setIsExpanded(true)}
        >
          Voir plus
        </Button>
      </>
    );
  };

  const FileAttachment = () => {
    if (!post.attachment_url || !post.attachment_type) return null;
    
    const Icon = getFileIcon(post.attachment_type);
    const fileName = post.attachment_url.split('/').pop();

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-background/50"
            onClick={() => window.open(post.attachment_url, '_blank')}
          >
            <Icon className="h-4 w-4" />
            <span className="truncate">{fileName}</span>
            <Badge variant="secondary" className="ml-auto">
              {post.attachment_type.split('/')[1].toUpperCase()}
            </Badge>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Fichier attaché</h4>
              <p className="text-sm text-muted-foreground">
                Cliquez pour télécharger ou ouvrir le fichier
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
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

      <div className="space-y-4">
        <p className="text-foreground whitespace-pre-wrap">
          {renderContent()}
        </p>

        {post.image_url && (
          <motion.div 
            className="relative w-full h-[300px] group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={post.image_url}
              alt="Post"
              className="rounded-lg w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button variant="secondary" size="sm" className="gap-2">
                <Link2 className="h-4 w-4" />
                Voir l'image
              </Button>
            </div>
          </motion.div>
        )}

        <FileAttachment />
      </div>

      <PostActions
        isLiked={isLiked}
        likesCount={post.post_likes?.length || 0}
        commentsCount={post.post_comments?.length || 0}
        onLike={handleLike}
        onToggleComments={() => setShowComments(!showComments)}
        postId={post.id}
        postUrl={postUrl}
        userId={currentUserId}
      />

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CommentSection
              comments={post.post_comments || []}
              onAddComment={async (content: string, parentId?: string) => {
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
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};