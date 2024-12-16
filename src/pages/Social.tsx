import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { NewsFeed } from '@/components/social/NewsFeed';
import { CreatePost } from '@/components/social/CreatePost';
import { SearchBar } from '@/components/social/SearchBar';
import { SocialSidebar } from '@/components/social/sidebar/SocialSidebar';
import { RightSidebar } from '@/components/social/sidebar/RightSidebar';

const Social = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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
      <div className="flex">
        <SocialSidebar />
        <div className="flex-1 container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="glass-panel p-4">
              <SearchBar />
            </div>
            
            <div className="glass-panel p-4">
              <CreatePost userId={user.id} />
            </div>
            
            <NewsFeed userId={user.id} />
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Social;