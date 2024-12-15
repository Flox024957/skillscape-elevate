import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Heart, MessageCircle, UserPlus, Share2, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SocialActivityProps {
  userId: string;
}

interface Profile {
  id: string;
  pseudo: string;
  image_profile: string;
}

export const SocialActivity = ({ userId }: SocialActivityProps) => {
  const navigate = useNavigate();
  
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
    return (
      <div className="text-center text-muted-foreground p-8 border border-dashed border-border rounded-lg">
        <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="font-medium">Aucune activité récente</p>
        <p className="text-sm text-muted-foreground mt-1">
          Les interactions avec vos amis apparaîtront ici
        </p>
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
        return (
          <span>
            a aimé votre publication
            <span className="block text-xs text-muted-foreground mt-1 italic">
              "{activity.postContent?.substring(0, 50)}..."
            </span>
          </span>
        );
      case 'comment':
        return (
          <span>
            a commenté : 
            <span className="block text-xs text-muted-foreground mt-1 italic">
              "{activity.content?.substring(0, 50)}..."
            </span>
          </span>
        );
      case 'friendship':
        return (
          <span>
            {activity.status === 'accepted' 
              ? 'est maintenant votre ami(e)' 
              : 'vous a envoyé une demande d\'ami'}
            <Badge 
              variant={activity.status === 'accepted' ? "success" : "secondary"}
              className="ml-2"
            >
              {activity.status === 'accepted' ? 'Acceptée' : 'En attente'}
            </Badge>
          </span>
        );
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Activité récente
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Partager mon profil
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.created_at + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3 group hover:bg-accent/50"
                onClick={() => navigate(`/profile/${activity.profile.id}`)}
              >
                <Avatar className="h-10 w-10 border-2 border-border group-hover:border-primary transition-colors">
                  <AvatarImage src={activity.profile.image_profile} />
                  <AvatarFallback>
                    {activity.profile.pseudo?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {activity.profile.pseudo}
                  </p>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};