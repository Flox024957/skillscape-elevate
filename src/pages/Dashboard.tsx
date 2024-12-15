import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-futuristic-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel p-6 mb-8">
          <h1 className="text-2xl font-bold neon-text">Dashboard</h1>
        </div>
        <div className="glass-panel">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;