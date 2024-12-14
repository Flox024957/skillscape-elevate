import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioTab from "./tabs/AudioTab";
import NotesTab from "./tabs/NotesTab";
import SkillsTab from "./tabs/SkillsTab";
import CanvasTab from "./tabs/CanvasTab";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
        {[
          { value: "skills", label: "Compétences" },
          { value: "notes", label: "Notes" },
          { value: "audio", label: "Audio" },
          { value: "canvas", label: "Canvas" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover:text-primary/80 transition-colors"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-6 space-y-8">
        <TabsContent value="skills" className="space-y-4">
          <SkillsTab />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <NotesTab />
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <AudioTab />
        </TabsContent>

        <TabsContent value="canvas" className="space-y-4">
          <CanvasTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;