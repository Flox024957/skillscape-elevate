import { CreatePostForm } from './post/CreatePostForm';
import { motion } from 'framer-motion';

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300"
    >
      <CreatePostForm userId={userId} />
    </motion.div>
  );
};