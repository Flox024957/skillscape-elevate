import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ActivityHeader } from "./social/ActivityHeader";
import { ActivityList } from "./social/ActivityList";
import { EmptyActivity } from "./social/EmptyActivity";

interface SocialActivityProps {
  userId: string;
}

interface Profile {
  id: string;
  pseudo: string;
  image_profile: string;
}

export const SocialActivity = ({ userId }: SocialActivityProps) => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['social-activity', userId],
    queryFn: async () => {
      const [likes, comments, friendships] = await Promise.all([
        supabase
          .from('post_likes')
          .select(`
            created_at,
            posts!inner(user_id, content),
            profiles!post_likes_user_id_fkey(
              id,
              pseudo,
              image_profile
            )
          `)
          .eq('posts.user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
          
        supabase
          .from('post_comments')
          .select(`
            created_at,
            content,
            posts!inner(user_id),
            profiles!post_comments_user_id_fkey(
              id,
              pseudo,
              image_profile
            )
          `)
          .eq('posts.user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
          
        supabase
          .from('friendships')
          .select(`
            created_at,
            status,
            profiles!friendships_friend_id_fkey(
              id,
              pseudo,
              image_profile
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      const allActivities = [
        ...(likes.data || []).map(like => ({
          type: 'like',
          created_at: like.created_at,
          profile: like.profiles as Profile,
          postContent: like.posts.content
        })),
        ...(comments.data || []).map(comment => ({
          type: 'comment',
          created_at: comment.created_at,
          profile: comment.profiles as Profile,
          content: comment.content
        })),
        ...(friendships.data || []).map(friendship => ({
          type: 'friendship',
          created_at: friendship.created_at,
          profile: friendship.profiles as Profile,
          status: friendship.status
        }))
      ].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 5);

      return allActivities;
    },
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
      </div>
    );
  }

  if (!activities?.length) {
    return <EmptyActivity />;
  }

  return (
    <div className="space-y-4">
      <ActivityHeader />
      <ActivityList activities={activities} />
    </div>
  );
};