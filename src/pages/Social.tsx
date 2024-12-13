import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsFeed } from '@/components/social/NewsFeed';
import { FriendsList } from '@/components/social/FriendsList';
import { ChatSection } from '@/components/social/ChatSection';
import { UserProfile } from '@/components/social/UserProfile';
import { CreatePost } from '@/components/social/CreatePost';
import { SearchBar } from '@/components/social/SearchBar';

const Social = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
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
    <div className="min-h-screen bg-futuristic-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar gauche - Profile et Navigation */}
          <div className="md:col-span-3">
            <div className="glass-panel p-4">
              <UserProfile userId={user.id} />
              <nav className="mt-6 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start neon-text"
                  onClick={() => setActiveTab("feed")}
                >
                  Fil d'actualité
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start neon-text"
                  onClick={() => setActiveTab("friends")}
                >
                  Amis
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start neon-text"
                  onClick={() => setActiveTab("messages")}
                >
                  Messages
                </Button>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-6">
            <div className="glass-panel p-4 mb-6">
              <SearchBar />
            </div>
            
            <div className="glass-panel p-4 mb-6">
              <CreatePost userId={user.id} />
            </div>
            
            <div className="glass-panel">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="feed">
                  <NewsFeed userId={user.id} />
                </TabsContent>
                <TabsContent value="friends">
                  <FriendsList userId={user.id} />
                </TabsContent>
                <TabsContent value="messages">
                  <ChatSection userId={user.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar droite - Contacts */}
          <div className="md:col-span-3">
            <div className="glass-panel p-4">
              <h3 className="font-semibold mb-4 neon-text">Contacts</h3>
              <FriendsList userId={user.id} variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;