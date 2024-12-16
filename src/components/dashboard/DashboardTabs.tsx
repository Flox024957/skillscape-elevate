import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Calendar, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSection from "./ProfileSection";
import { SocialActivity } from "./SocialActivity";
import { lazy, Suspense } from "react";

// Lazy load les composants lourds
const LazyCanvasTab = lazy(() => import("./tabs/CanvasTab"));
const LazyNotesTab = lazy(() => import("./tabs/NotesTab"));

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

  if (!user) return null;

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="space-y-4">
      {/* Profile Section avec Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden",
          isMobile ? "mx-2" : ""
        )}
      >
        <ProfileSection user={user} onSignOut={async () => {}} />
      </motion.div>

      {/* Tabs Principal */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className={cn(
          "w-full flex gap-1 bg-background/50 backdrop-blur-sm border border-border rounded-lg sticky top-0 z-10",
          isMobile ? "p-1 mb-2 mx-2" : "p-1 mb-6"
        )}>
          <TabsTrigger 
            value="skills" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all",
              isMobile ? "text-xs py-2.5" : "text-sm"
            )}
          >
            <Book className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
            {isMobile ? "Skills" : "Compétences"}
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all",
              isMobile ? "text-xs py-2.5" : "text-sm"
            )}
          >
            <Calendar className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="canvas" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all",
              isMobile ? "text-xs py-2.5" : "text-sm"
            )}
          >
            <PenTool className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
            Canvas
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div 
            className={cn(
              "space-y-4",
              isMobile ? "px-2" : "px-4"
            )}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <TabsContent value="skills" className="space-y-4 mt-0">
              <SkillsTab userId={user.id} />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-muted rounded-lg"></div>
                  <div className="h-32 bg-muted rounded-lg"></div>
                </div>
              }>
                <LazyNotesTab userId={user.id} />
              </Suspense>
            </TabsContent>

            <TabsContent value="canvas" className="mt-0">
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-muted rounded-lg"></div>
                  <div className="h-32 bg-muted rounded-lg"></div>
                </div>
              }>
                <LazyCanvasTab userId={user.id} />
              </Suspense>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Section Activité Sociale */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mx-2 mb-20"
        >
          <SocialActivity userId={user.id} />
        </motion.div>
      )}
    </div>
  );
};