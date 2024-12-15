import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SocialActivityProps {
  userId: string;
}

export const SocialActivity = ({ userId }: SocialActivityProps) => {
  const navigate = useNavigate();
  
  const { data: activities, isLoading } = useQuery({
    queryKey: ['social-activity', userId],
    queryFn: async () => {
      const [likes, comments, friendships] = await Promise.all([
        // Get recent likes on user's posts
        supabase
          .from('post_likes')
          .select(`
            created_at,
            posts!inner(user_id),
            profiles!post_likes_user_id_fkey(
              pseudo,
              image_profile
            )
          `)
          .eq('posts.user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
          
        // Get recent comments on user's posts
        supabase
          .from('post_comments')
          .select(`
            created_at,
            content,
            posts!inner(user_id),
            profiles!post_comments_user_id_fkey(
              pseudo,
              image_profile
            )
          `)
          .eq('posts.user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
          
        // Get recent friend requests
        supabase
          .from('friendships')
          .select(`
            created_at,
            status,
            profiles!friendships_friend_id_fkey(
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
          profile: like.profiles,
        })),
        ...(comments.data || []).map(comment => ({
          type: 'comment',
          created_at: comment.created_at,
          profile: comment.profiles,
          content: comment.content
        })),
        ...(friendships.data || []).map(friendship => ({
          type: 'friendship',
          created_at: friendship.created_at,
          profile: friendship.profiles,
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
    return (
      <div className="text-center text-muted-foreground p-4">
        No recent activity
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'friendship':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'like':
        return 'a aimé votre publication';
      case 'comment':
        return 'a commenté votre publication';
      case 'friendship':
        return activity.status === 'accepted' 
          ? 'est maintenant votre ami(e)' 
          : 'vous a envoyé une demande d\'ami';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Activité récente</h3>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={() => navigate(`/profile/${activity.profile.id}`)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.profile.image_profile} />
              <AvatarFallback>
                {activity.profile.pseudo?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="font-medium">{activity.profile.pseudo}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                {getActivityIcon(activity.type)}
                {getActivityText(activity)}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
                locale: fr
              })}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};