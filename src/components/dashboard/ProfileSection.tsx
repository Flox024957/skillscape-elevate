import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProfileSectionProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const ProfileSection = ({ user, onSignOut }: ProfileSectionProps) => {
  const navigate = useNavigate();

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              Welcome, {user.user_metadata.full_name || user.email}
            </h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/main")}>
            Explore Skills
          </Button>
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => navigate("/friends")}
        >
          <Users className="h-4 w-4" />
          <Badge variant="secondary">{socialStats?.friends || 0}</Badge>
          Friends
        </Button>
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => navigate("/messages")}
        >
          <MessageCircle className="h-4 w-4" />
          Messages
        </Button>
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          <Badge variant="secondary">{socialStats?.posts || 0}</Badge>
          Posts
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;