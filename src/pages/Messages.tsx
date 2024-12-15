import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { ChatSection } from '@/components/social/ChatSection';
import { SocialSidebar } from '@/components/social/sidebar/SocialSidebar';

const Messages = () => {
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
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          <ChatSection userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default Messages;