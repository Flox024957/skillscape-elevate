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
    <div className="space-y-12 pb-20">
      {/* Profile Section avec Animation */}
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

      {/* Tabs Principal */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className={cn(
          "w-full flex gap-2 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg sticky top-0 z-50",
          "shadow-lg shadow-purple-500/5",
          "transform hover:scale-[1.01] transition-all duration-300",
          isMobile ? "p-2 mb-20 mx-4" : "p-1 mb-12"
        )}>
          <TabsTrigger 
            value="skills" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
              "transition-all duration-300 py-3",
              "hover:bg-primary/5",
              "transform hover:scale-[1.02]",
              isMobile ? "text-sm" : "text-base"
            )}
          >
            <Book className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
            {isMobile ? "Compétences" : "Compétences"}
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
              "transition-all duration-300 py-3",
              "hover:bg-primary/5",
              "transform hover:scale-[1.02]",
              isMobile ? "text-sm" : "text-base"
            )}
          >
            <Calendar className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="canvas" 
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
              "transition-all duration-300 py-3",
              "hover:bg-primary/5",
              "transform hover:scale-[1.02]",
              isMobile ? "text-sm" : "text-base"
            )}
          >
            <PenTool className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
            Canvas
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
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
            <TabsContent value="skills" className="space-y-8 mt-0">
              <SkillsTab userId={user.id} />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <Suspense fallback={
                <div className="animate-pulse space-y-8">
                  <div className="h-12 bg-muted rounded-lg"></div>
                  <div className="h-32 bg-muted rounded-lg"></div>
                </div>
              }>
                <LazyNotesTab userId={user.id} />
              </Suspense>
            </TabsContent>

            <TabsContent value="canvas" className="mt-0">
              <Suspense fallback={
                <div className="animate-pulse space-y-8">
                  <div className="h-12 bg-muted rounded-lg"></div>
                  <div className="h-32 bg-muted rounded-lg"></div>
                </div>
              }>
                <LazyCanvasTab user={user} />
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
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mx-4 mb-24"
        >
          <SocialActivity userId={user.id} />
        </motion.div>
      )}
    </div>
  );
};