import ProfileSection from "@/components/dashboard/ProfileSection";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card p-6 mb-8 rounded-lg border border-border">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        </div>
        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;