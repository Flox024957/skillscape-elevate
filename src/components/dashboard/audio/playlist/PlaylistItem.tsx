import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PlaylistItemProps {
  skill: {
    id: string;
    titre: string;
  };
  index: number;
  playlistId: string;
  onPlay: (content: string) => void;
  onRemove: (playlistId: string, skillId: string) => void;
}

export const PlaylistItem = ({ skill, index, playlistId, onPlay, onRemove }: PlaylistItemProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
      <span className="text-sm">{index + 1}. {skill.titre}</span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onRemove(playlistId, skill.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            onPlay(skill.titre);
            toast.success("Lecture démarrée");
          }}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};