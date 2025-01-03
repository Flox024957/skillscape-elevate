import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface ProfileSectionProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const ProfileSection = memo(({ user, onSignOut }: ProfileSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: socialStats } = useQuery({
    queryKey: ['social-stats', user.id],
    queryFn: async () => {
      const [friendsCount, postsCount] = await Promise.all([
        supabase
          .from('friendships')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'accepted')
          .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`),
        supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
      ]);

      return {
        friends: friendsCount.count || 0,
        posts: postsCount.count || 0
      };
    },
    staleTime: 30000,
  });

  return (
    <div className="p-6 space-y-6">
      <div className={cn(
        "flex items-center",
        isMobile ? "justify-between" : "gap-4"
      )}>
        <div className="flex items-center gap-4">
          <Avatar className={cn(
            "ring-2 ring-primary/20 ring-offset-2 ring-offset-background",
            "transform hover:scale-105 transition-all duration-300",
            isMobile ? "h-14 w-14" : "h-16 w-16"
          )}>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className={cn(
              "font-semibold",
              "bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent",
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
            <Button 
              variant="outline" 
              onClick={onSignOut}
              className="hover:scale-105 transition-transform duration-300"
            >
              Déconnexion
            </Button>
          </div>
        )}
      </div>

      {isMobile && (
        <Button
          variant="ghost"
          size="default"
          className={cn(
            "flex gap-3 flex-1 h-12 px-3",
            "hover:bg-primary/10 hover:text-primary",
            "transform hover:scale-[1.02] transition-all duration-300"
          )}
          onClick={onSignOut}
        >
          Déconnexion
        </Button>
      )}
    </div>
  );
});

ProfileSection.displayName = "ProfileSection";

export default ProfileSection;