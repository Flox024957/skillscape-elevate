import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordingSection } from "@/components/dashboard/audio/RecordingSection";
import { SkillLibrary } from "../audio/library/SkillLibrary";
import { PlaylistManager } from "../audio/playlist/PlaylistManager";

const AudioTab = () => {
  return (
    <Tabs defaultValue="player" className="w-full space-y-6">
      <TabsList className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
        <TabsTrigger 
          value="player"
          className="data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-white"
        >
          Lecteur
        </TabsTrigger>
        <TabsTrigger 
          value="recorder"
          className="data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-white"
        >
          Enregistreur
        </TabsTrigger>
      </TabsList>

      <TabsContent value="player" className="space-y-4">
        <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillLibrary 
              onContentSelect={() => {}}
              onSkillSelect={() => {}}
              selectedSkills={[]}
            />
            <PlaylistManager />
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="recorder">
        <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-6">
          <RecordingSection />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AudioTab;