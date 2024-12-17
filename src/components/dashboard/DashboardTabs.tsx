import { Tabs } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProfileSection from "./ProfileSection";
import { TabsList } from "./tabs/TabsList";
import { TabsContent } from "./tabs/TabsContent";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <div className="space-y-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className={cn(
          "glass-panel-pro transform hover:scale-[1.01] transition-all duration-300",
          "bg-gradient-to-br from-purple-500/10 via-background/80 to-blue-500/10",
          isMobile ? "mx-4" : ""
        )}
      >
        <ProfileSection user={user} onSignOut={async () => {}} />
      </motion.div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList />
        <AnimatePresence mode="wait">
          <TabsContent user={user} />
        </AnimatePresence>
      </Tabs>
    </div>
  );
};