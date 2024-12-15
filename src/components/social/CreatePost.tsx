import { CreatePostForm } from './post/CreatePostForm';

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
      <CreatePostForm userId={userId} />
    </div>
  );
};