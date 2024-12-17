import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { ProfileAvatar } from "./profile/ProfileAvatar";
import { ProfileInfo } from "./profile/ProfileInfo";
import { ProfileActions } from "./profile/ProfileActions";
import { SocialStats } from "./profile/SocialStats";

interface ProfileSectionProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const ProfileSection = memo(({ user, onSignOut }: ProfileSectionProps) => {
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
          <ProfileAvatar 
            avatarUrl={user.user_metadata.avatar_url} 
            email={user.email} 
          />
          <ProfileInfo 
            fullName={user.user_metadata.full_name || user.email}
            email={user.email || ''}
          />
        </div>
        {!isMobile && <ProfileActions onSignOut={onSignOut} />}
      </div>

      <SocialStats 
        friendsCount={socialStats?.friends || 0}
        onSignOut={onSignOut}
      />
    </div>
  );
});

ProfileSection.displayName = "ProfileSection";

export default ProfileSection;