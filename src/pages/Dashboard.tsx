import ProfileSection from "@/components/dashboard/ProfileSection";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { PageContainer } from "@/components/layout/PageContainer";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div className="glass-panel p-6 mb-8 hover:border-neon-purple/50 transition-colors">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Dashboard
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 space-y-8"
        >
          <DashboardTabs />
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default Dashboard;