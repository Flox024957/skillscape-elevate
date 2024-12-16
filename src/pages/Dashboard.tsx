import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
      <div className="min-h-screen bg-background/50 backdrop-blur-sm p-2">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-neon-purple/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-lg text-muted-foreground">
              Chargement...
            </span>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm">
      <div className={cn(
        "mx-auto",
        isMobile ? "max-w-full px-0" : "max-w-7xl px-4"
      )}>
        <motion.div 
          className={cn(
            "glass-panel neon-frame overflow-hidden",
            isMobile ? "rounded-none border-x-0 mt-0" : "m-4 rounded-lg"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={cn(
            "border-b border-neon-purple/30 bg-card/50 backdrop-blur-sm",
            isMobile ? "p-3" : "p-4"
          )}>
            <h1 className={cn(
              "font-bold futuristic-text",
              isMobile ? "text-lg" : "text-2xl"
            )}>
              Tableau de bord
            </h1>
          </div>
          <div className={cn(
            isMobile ? "p-0" : "p-4"
          )}>
            <DashboardTabs user={user} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;