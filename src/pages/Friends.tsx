import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { FriendsList } from '@/components/social/FriendsList';
import { SearchBar } from '@/components/social/SearchBar';
import { SocialSidebar } from '@/components/social/sidebar/SocialSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Friends = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/auth');
      }
    };

    getUser();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className={cn(
        "flex",
        isMobile && "flex-col"
      )}>
        <SocialSidebar />
        <div className={cn(
          "flex-1",
          isMobile ? "px-2 py-4" : "container mx-auto px-4 py-6"
        )}>
          <div className="space-y-4">
            <h1 className={cn(
              "font-semibold gradient-text",
              isMobile ? "text-xl" : "text-2xl"
            )}>
              Amis
            </h1>
            <div className="glass-panel p-3">
              <SearchBar />
            </div>
            <div className="glass-panel p-3">
              <FriendsList userId={user.id} variant="full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;