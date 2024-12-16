import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const ProfileSection = ({ user, onSignOut }: ProfileSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: socialStats } = useQuery({
    queryKey: ['social-stats', user.id],
    queryFn: async () => {
      const [friendsCount, postsCount] = await Promise.all([
        supabase
          .from('friendships')
          .select('id', { count: 'exact' })
          .eq('status', 'accepted')
          .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
          .then(({ count }) => count),
        supabase
          .from('posts')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id)
          .then(({ count }) => count)
      ]);

      return {
        friends: friendsCount || 0,
        posts: postsCount || 0
      };
    },
    staleTime: 30000,
  });

  return (
    <div className="p-4 space-y-4">
      <div className={cn(
        "flex items-center",
        isMobile ? "justify-between" : "gap-4"
      )}>
        <div className="flex items-center gap-3">
          <Avatar className={cn(
            "border-2 border-primary/20",
            isMobile ? "h-12 w-12" : "h-16 w-16"
          )}>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className={cn(
              "font-semibold",
              isMobile ? "text-base" : "text-xl"
            )}>
              {user.user_metadata.full_name || user.email}
            </h2>
            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
              {user.email}
            </p>
          </div>
        </div>
        {!isMobile && (
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/main")}>
              Explorer
            </Button>
            <Button variant="outline" onClick={onSignOut}>
              Déconnexion
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          className="flex gap-2 flex-1"
          onClick={() => navigate("/friends")}
        >
          <Users className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
          <Badge variant="secondary">{socialStats?.friends || 0}</Badge>
          {!isMobile && "Amis"}
        </Button>
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          className="flex gap-2 flex-1"
          onClick={() => navigate("/messages")}
        >
          <MessageCircle className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
          Messages
        </Button>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 flex-1"
            onClick={onSignOut}
          >
            Déconnexion
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;