import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTab from "./tabs/SkillsTab";
import NotesTab from "./tabs/NotesTab";
import CanvasTab from "./tabs/CanvasTab";
import AudioTab from "./tabs/AudioTab";
import MasteredSkillsSection from "./tabs/skills/MasteredSkillsSection";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="skills" className="space-y-4">
      <TabsList className="grid grid-cols-5 gap-4">
        <TabsTrigger value="skills">Compétences & Actions</TabsTrigger>
        <TabsTrigger value="mastered">Compétences Maîtrisées</TabsTrigger>
        <TabsTrigger value="notes">Notes & Calendrier</TabsTrigger>
        <TabsTrigger value="canvas">Canevas</TabsTrigger>
        <TabsTrigger value="audio">Lecteur Audio</TabsTrigger>
      </TabsList>

      <TabsContent value="skills">
        <SkillsTab />
      </TabsContent>

      <TabsContent value="mastered">
        <MasteredSkillsSection />
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