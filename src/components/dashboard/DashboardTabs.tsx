import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTab from "./tabs/SkillsTab";
import NotesTab from "./tabs/NotesTab";
import CanvasTab from "./tabs/CanvasTab";
import AudioTab from "./tabs/AudioTab";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="skills" className="space-y-4">
      <TabsList className="grid grid-cols-4 gap-4">
        <TabsTrigger value="skills">Skills & Actions</TabsTrigger>
        <TabsTrigger value="notes">Notes & Calendar</TabsTrigger>
        <TabsTrigger value="canvas">Canvas</TabsTrigger>
        <TabsTrigger value="audio">Audio Player</TabsTrigger>
      </TabsList>

      <TabsContent value="skills">
        <SkillsTab />
      </TabsContent>

      <TabsContent value="notes">
        <NotesTab />
      </TabsContent>

      <TabsContent value="canvas">
        <CanvasTab />
      </TabsContent>

      <TabsContent value="audio">
        <AudioTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;