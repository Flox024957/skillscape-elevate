import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioTabsContainer from "./audio/AudioTabsContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const AudioTab = () => {
  const isMobile = useIsMobile();

  return (
    <Card className={cn(
      "bg-[#0A1E3D]/40 border-[#1E3D7B]/30 backdrop-blur-xl",
      isMobile && "border-0"
    )}>
      <CardHeader className={cn(
        isMobile ? "px-2 py-3" : "px-6 py-4"
      )}>
        <CardTitle className="text-[#E5DEFF] text-lg">
          Lecteur Audio
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        isMobile ? "p-2" : "p-6"
      )}>
        <AudioTabsContainer />
      </CardContent>
    </Card>
  );
};

export default AudioTab;