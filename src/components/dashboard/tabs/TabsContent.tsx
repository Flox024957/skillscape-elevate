import { TabsContent as BaseTabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@supabase/supabase-js";
import SkillsTab from "./SkillsTab";
import { lazy, Suspense } from "react";

const LazyNotesTab = lazy(() => import("./NotesTab"));
const LazyCanvasTab = lazy(() => import("./CanvasTab"));

interface TabsContentProps {
  user: User;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const TabsContent = ({ user }: TabsContentProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className={cn(
        "space-y-8",
        isMobile ? "px-4 mt-20" : "px-4"
      )}
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BaseTabsContent value="skills" className="space-y-8 mt-0">
        <SkillsTab userId={user.id} />
      </BaseTabsContent>

      <BaseTabsContent value="notes" className="mt-0">
        <Suspense fallback={
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        }>
          <LazyNotesTab userId={user.id} />
        </Suspense>
      </BaseTabsContent>

      <BaseTabsContent value="canvas" className="mt-0">
        <Suspense fallback={
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        }>
          <LazyCanvasTab user={user} />
        </Suspense>
      </BaseTabsContent>
    </motion.div>
  );
};