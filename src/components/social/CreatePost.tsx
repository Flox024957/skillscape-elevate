import { CreatePostForm } from './post/CreatePostForm';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 ${
        isMobile ? 'p-3' : 'p-4'
      }`}
    >
      <CreatePostForm userId={userId} />
    </motion.div>
  );
};