import ProfileSection from "@/components/dashboard/ProfileSection";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { PageContainer } from "@/components/layout/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel p-6 mb-8">
          <h1 className="text-2xl font-bold neon-text">Dashboard</h1>
        </div>
        <div className="glass-panel">
          <DashboardTabs />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;