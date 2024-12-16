import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Book, Calendar, PenTool, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className={cn(
        "w-full flex gap-1 bg-background/50 backdrop-blur-sm border border-neon-purple/30 rounded-lg",
        isMobile ? "p-1 mb-2 overflow-x-auto no-scrollbar" : "p-1 mb-6"
      )}>
        <TabsTrigger 
          value="skills" 
          className={cn(
            "flex items-center gap-2 flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm hover:text-neon-purple transition-colors",
            isMobile && "text-xs"
          )}
        >
          <Book className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
          {isMobile ? "Skills" : "Compétences & Maîtrises"}
        </TabsTrigger>
        <TabsTrigger 
          value="notes" 
          className={cn(
            "flex items-center gap-2 flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm hover:text-neon-purple transition-colors",
            isMobile && "text-xs"
          )}
        >
          <Calendar className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
          {isMobile ? "Notes" : "Agenda/Notes"}
        </TabsTrigger>
        <TabsTrigger 
          value="canvas" 
          className={cn(
            "flex items-center gap-2 flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm hover:text-neon-purple transition-colors",
            isMobile && "text-xs"
          )}
        >
          <PenTool className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
          Canvas
        </TabsTrigger>
        <TabsTrigger 
          value="audio" 
          className={cn(
            "flex items-center gap-2 flex-1 min-w-max whitespace-nowrap px-3 py-2 text-sm hover:text-neon-purple transition-colors",
            isMobile && "text-xs"
          )}
        >
          <Music className={cn("w-4 h-4", isMobile && "w-3 h-3")} />
          Audio
        </TabsTrigger>
      </TabsList>

      <motion.div 
        className={cn(
          "space-y-4",
          isMobile ? "px-2" : "px-4"
        )}
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