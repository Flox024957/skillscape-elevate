import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioTabsContainer from "./audio/AudioTabsContainer";

const AudioTab = () => {
  return (
    <Card className="bg-[#0A1E3D]/40 border-[#1E3D7B]/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-[#E5DEFF]">
          Lecteur Audio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AudioTabsContainer />
      </CardContent>
    </Card>
  );
};

export default AudioTab;