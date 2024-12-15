import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { NewsFeed } from '@/components/social/NewsFeed';
import { FriendsList } from '@/components/social/FriendsList';
import { ChatSection } from '@/components/social/ChatSection';
import { CreatePost } from '@/components/social/CreatePost';
import { SearchBar } from '@/components/social/SearchBar';
import { SocialSidebar } from '@/components/social/sidebar/SocialSidebar';

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
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

            <div className="space-y-6">
              <div className="glass-panel p-4 sticky top-20">
                <h3 className="font-semibold mb-4 text-lg">Contacts</h3>
                <FriendsList userId={user.id} variant="compact" />
                <ChatSection userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;