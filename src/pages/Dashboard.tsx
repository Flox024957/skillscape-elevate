import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

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
            className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border"
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
    <>
      <div className={cn(
        "min-h-screen bg-background/50 backdrop-blur-sm",
        isMobile ? "pb-20 pt-2" : "py-4"
      )}>
        <div className={cn(
          "mx-auto",
          isMobile ? "max-w-full" : "max-w-7xl px-4"
        )}>
          <DashboardTabs user={user} />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Dashboard;