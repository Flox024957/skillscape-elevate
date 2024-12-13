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
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar gauche - Profile et Navigation */}
        <div className="md:col-span-3">
          <UserProfile userId={user.id} />
          <nav className="mt-6 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setActiveTab("feed")}
            >
              Fil d'actualité
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setActiveTab("friends")}
            >
              Amis
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </Button>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-6">
          <CreatePost userId={user.id} />
          
          <Tabs value={activeTab} className="mt-6">
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

        {/* Sidebar droite - Contacts et Suggestions */}
        <div className="md:col-span-3">
          <div className="bg-card rounded-lg p-4">
            <h3 className="font-semibold mb-4">Contacts</h3>
            <FriendsList userId={user.id} variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;