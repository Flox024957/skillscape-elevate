import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import DreamAnalysisTab from "./tabs/DreamAnalysisTab";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  if (!user) return null;

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="space-y-4"
    >
      <motion.div variants={tabVariants}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-background/50 backdrop-blur-sm p-1 rounded-lg border border-border/50">
          <TabsTrigger 
            value="skills"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Compétences
          </TabsTrigger>
          <TabsTrigger 
            value="notes"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="canvas"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Canvas
          </TabsTrigger>
          <TabsTrigger 
            value="audio"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Audio
          </TabsTrigger>
          <TabsTrigger 
            value="dreams"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Rêves
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <Tabs defaultValue="skills" className="space-y-4">
        <motion.div variants={contentVariants}>
          <TabsContent value="skills" className="space-y-4">
            <div className="glass-panel p-6">
              <SkillsTab userId={user.id} />
            </div>
          </TabsContent>
        </motion.div>

        <motion.div variants={contentVariants}>
          <TabsContent value="notes">
            <div className="glass-panel p-6">
              <NotesTab userId={user.id} />
            </div>
          </TabsContent>
        </motion.div>

        <motion.div variants={contentVariants}>
          <TabsContent value="canvas">
            <div className="glass-panel p-6">
              <CanvasTab userId={user.id} />
            </div>
          </TabsContent>
        </motion.div>

        <motion.div variants={contentVariants}>
          <TabsContent value="audio">
            <div className="glass-panel p-6">
              <AudioTab />
            </div>
          </TabsContent>
        </motion.div>

        <motion.div variants={contentVariants}>
          <TabsContent value="dreams">
            <div className="glass-panel p-6">
              <DreamAnalysisTab />
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </motion.div>
  );
};