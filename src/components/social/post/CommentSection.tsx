import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CommentTree } from './comments/CommentTree';
import { CommentInput } from './comments/CommentInput';

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

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Organiser les commentaires en arbre
  const commentTree = comments.reduce((acc, comment) => {
    if (!comment.parent_id) {
      acc.root.push(comment);
    } else {
      if (!acc.replies[comment.parent_id]) {
        acc.replies[comment.parent_id] = [];
      }
      acc.replies[comment.parent_id].push(comment);
    }
    return acc;
  }, { root: [] as Comment[], replies: {} as Record<string, Comment[]> });

  const handleSubmit = async () => {
    if (!commentContent.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddComment(commentContent, replyingTo);
      setCommentContent('');
      setReplyingTo(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <CommentInput
        value={commentContent}
        onChange={setCommentContent}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        placeholder={replyingTo ? "Écrire une réponse..." : "Ajouter un commentaire..."}
      />

      <AnimatePresence>
        <div className="space-y-3">
          {commentTree.root.map(comment => (
            <CommentTree
              key={comment.id}
              comment={comment}
              replies={commentTree.replies[comment.id] || []}
              onReply={setReplyingTo}
              replyingTo={replyingTo}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};