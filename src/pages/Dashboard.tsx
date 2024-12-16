import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-background/50 backdrop-blur-sm p-2 md:p-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-neon-purple/50 neon-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-lg text-muted-foreground futuristic-text">
              Chargement...
            </span>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className={`glass-panel neon-frame overflow-hidden ${
            isMobile ? 'mx-2 my-2' : 'mx-4 my-4'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-neon-purple/30 bg-card/50 backdrop-blur-sm">
            <h1 className="text-xl md:text-2xl font-bold futuristic-text">
              Tableau de bord
            </h1>
          </div>
          <div className="p-2 md:p-4">
            <DashboardTabs user={user} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;