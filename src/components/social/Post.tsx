import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostHeader } from './post/PostHeader';
import { PostActions } from './post/PostActions';
import { CommentSection } from './post/CommentSection';
import { PostContent } from './post/PostContent';
import { PostFile } from './post/PostFile';
import { useLikes } from './post/useLikes';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PostProps {
  post: any;
  currentUserId: string;
}

export const Post = ({ post, currentUserId }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleLike } = useLikes(post.id, currentUserId);

  const isLiked = post.post_likes?.some(
    (like: any) => like.user_id === currentUserId
  );

  const postUrl = `${window.location.origin}/post/${post.id}`;
  const shouldTruncate = post.content.length > 280;

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
        postId={post.id}
        currentUserId={currentUserId}
      />

      <PostContent 
        content={post.content}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        shouldTruncate={shouldTruncate}
        image_url={post.image_url}
      />

      <PostFile 
        attachment_url={post.attachment_url}
        attachment_type={post.attachment_type}
      />

      <PostActions
        isLiked={isLiked}
        likesCount={post.post_likes?.length || 0}
        commentsCount={post.post_comments?.length || 0}
        onLike={() => handleLike(isLiked)}
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