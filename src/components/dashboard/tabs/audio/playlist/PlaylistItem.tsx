import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";

interface PlaylistItemProps {
  index: number;
  title: string;
  onRemove: () => void;
  onPlay: () => void;
}

export const PlaylistItem = ({ index, title, onRemove, onPlay }: PlaylistItemProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
      <span className="text-sm">{index + 1}. {title}</span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onPlay}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};