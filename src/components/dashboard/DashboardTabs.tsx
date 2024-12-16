import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className="w-full flex overflow-x-auto gap-1 p-1 mb-6 bg-background/50 backdrop-blur-sm border border-border rounded-lg">
        <TabsTrigger 
          value="skills" 
          className="flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm"
        >
          {isMobile ? "Skills" : "Compétences"}
        </TabsTrigger>
        <TabsTrigger 
          value="notes" 
          className="flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm"
        >
          Notes
        </TabsTrigger>
        <TabsTrigger 
          value="canvas" 
          className="flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm"
        >
          Canvas
        </TabsTrigger>
        <TabsTrigger 
          value="audio" 
          className="flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm"
        >
          Audio
        </TabsTrigger>
      </TabsList>

      <motion.div 
        className="space-y-4 px-2 md:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsContent value="skills" className="space-y-4 mt-0">
          <SkillsTab userId={user.id} />
        </TabsContent>

        <TabsContent value="notes" className="mt-0">
          <NotesTab userId={user.id} />
        </TabsContent>

        <TabsContent value="canvas" className="mt-0">
          <CanvasTab userId={user.id} />
        </TabsContent>

        <TabsContent value="audio" className="mt-0">
          <AudioTab />
        </TabsContent>
      </motion.div>
    </Tabs>
  );
};