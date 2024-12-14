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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar gauche - Profile et Navigation */}
          <div className="md:col-span-3">
            <div className="glass-panel p-4 backdrop-blur-xl border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <UserProfile userId={user.id} />
              <nav className="mt-6 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] transition-all duration-300"
                  onClick={() => setActiveTab("feed")}
                >
                  Fil d'actualité
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] transition-all duration-300"
                  onClick={() => setActiveTab("friends")}
                >
                  Amis
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] transition-all duration-300"
                  onClick={() => setActiveTab("messages")}
                >
                  Messages
                </Button>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-6">
            <div className="glass-panel p-4 mb-6 backdrop-blur-xl border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <SearchBar />
            </div>
            
            <div className="glass-panel p-4 mb-6 backdrop-blur-xl border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <CreatePost userId={user.id} />
            </div>
            
            <div className="glass-panel backdrop-blur-xl border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Tabs value={activeTab} className="w-full">
                <TabsList className="w-full bg-background/50 backdrop-blur-md border-b border-[#8B5CF6]/30">
                  <TabsTrigger 
                    value="feed"
                    className="flex-1 data-[state=active]:bg-[#8B5CF6]/20 data-[state=active]:text-[#8B5CF6]"
                  >
                    Fil d'actualité
                  </TabsTrigger>
                  <TabsTrigger 
                    value="friends"
                    className="flex-1 data-[state=active]:bg-[#8B5CF6]/20 data-[state=active]:text-[#8B5CF6]"
                  >
                    Amis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="messages"
                    className="flex-1 data-[state=active]:bg-[#8B5CF6]/20 data-[state=active]:text-[#8B5CF6]"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="feed" className="p-4">
                  <NewsFeed userId={user.id} />
                </TabsContent>
                <TabsContent value="friends" className="p-4">
                  <FriendsList userId={user.id} />
                </TabsContent>
                <TabsContent value="messages" className="p-4">
                  <ChatSection userId={user.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar droite - Contacts */}
          <div className="md:col-span-3">
            <div className="glass-panel p-4 backdrop-blur-xl border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <h3 className="font-semibold mb-4 text-[#8B5CF6] text-shadow-neon">Contacts</h3>
              <FriendsList userId={user.id} variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;