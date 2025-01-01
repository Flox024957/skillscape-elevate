import { Card } from "@/components/ui/card";
import PlaylistSelector from "../playlist/PlaylistSelector";
import { usePlaylist } from "../hooks/usePlaylist";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlaylistSectionProps {
  onPlaylistSelect: (playlist: any) => void;
  currentPlaylist: any;
}

const PlaylistSection = ({ onPlaylistSelect, currentPlaylist }: PlaylistSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className={cn(
      "bg-[#1E3D7B]/20 border-[#1E3D7B]/30",
      "backdrop-blur-xl shadow-lg",
      isMobile ? "p-2" : "p-4"
    )}>
      <PlaylistSelector
        currentPlaylist={currentPlaylist}
        onPlaylistSelect={onPlaylistSelect}
      />
    </Card>
  );
};

export default PlaylistSection;