import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-futuristic-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-6">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-futuristic-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel p-6 mb-8">
          <h1 className="text-2xl font-bold neon-text">Dashboard</h1>
        </div>
        <div className="glass-panel">
          <DashboardTabs user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;