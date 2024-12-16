import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import CanvasTab from "./tabs/CanvasTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import DreamAnalysisTab from "./tabs/DreamAnalysisTab";
import { User } from "@supabase/supabase-js";

interface DashboardTabsProps {
  user: User;
}

export const DashboardTabs = ({ user }: DashboardTabsProps) => {
  if (!user) return null;

  return (
    <Tabs defaultValue="skills" className="space-y-4">
      <TabsList>
        <TabsTrigger value="skills">Compétences</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="canvas">Canvas</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="dreams">Rêves</TabsTrigger>
      </TabsList>

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
    </Tabs>
  );
};