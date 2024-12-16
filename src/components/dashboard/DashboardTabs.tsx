import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import DreamAnalysisTab from "./tabs/DreamAnalysisTab";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <Tabs defaultValue="skills" className="space-y-4">
      <TabsList className="tabs-list">
        <TabsTrigger value="skills" className="tab-trigger">
          {isMobile ? "Skills" : "Compétences"}
        </TabsTrigger>
        <TabsTrigger value="notes" className="tab-trigger">Notes</TabsTrigger>
        <TabsTrigger value="canvas" className="tab-trigger">Canvas</TabsTrigger>
        <TabsTrigger value="audio" className="tab-trigger">Audio</TabsTrigger>
        <TabsTrigger value="dreams" className="tab-trigger">
          {isMobile ? "Rêves" : "Analyse des rêves"}
        </TabsTrigger>
      </TabsList>

      <div className="dashboard-tab-content">
        <TabsContent value="skills" className="space-y-4">
          <SkillsTab userId={user.id} />
        </TabsContent>

        <TabsContent value="notes">
          <NotesTab userId={user.id} />
        </TabsContent>

        <TabsContent value="canvas">
          <CanvasTab userId={user.id} />
        </TabsContent>

        <TabsContent value="audio">
          <AudioTab />
        </TabsContent>

        <TabsContent value="dreams">
          <DreamAnalysisTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};