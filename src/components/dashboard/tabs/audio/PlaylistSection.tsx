import { Card } from "@/components/ui/card";
import { PlaylistContent } from "./playlist/PlaylistContent";
import { usePlaylist } from "./playlist/usePlaylist";

export const PlaylistSection = () => {
  const { skills, handleRemoveFromPlaylist } = usePlaylist();

  const handlePlaySkill = (skillId: string) => {
    // Implement play functionality
    console.log("Playing skill:", skillId);
  };

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <h4 className="font-semibold mb-4">Playlist en cours</h4>
      <PlaylistContent
        skills={skills}
        onRemoveFromPlaylist={handleRemoveFromPlaylist}
        onPlaySkill={handlePlaySkill}
      />
    </Card>
  );
};
