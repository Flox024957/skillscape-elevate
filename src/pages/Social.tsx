import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { NewsFeed } from '@/components/social/NewsFeed';
import { CreatePost } from '@/components/social/CreatePost';
import { SearchBar } from '@/components/social/SearchBar';
import { SocialSidebar } from '@/components/social/sidebar/SocialSidebar';
import { RightSidebar } from '@/components/social/sidebar/RightSidebar';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl animate-cosmic-wave-1" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full filter blur-3xl animate-cosmic-wave-2" />
      </div>

      <div className="flex relative z-10">
        <SocialSidebar />
        <motion.div 
          className="flex-1 container mx-auto px-4 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <motion.div 
              className="glass-panel p-4 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SearchBar />
            </motion.div>
            
            <motion.div 
              className="glass-panel p-4 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CreatePost userId={user.id} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <NewsFeed userId={user.id} />
            </motion.div>
          </div>
        </motion.div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Social;