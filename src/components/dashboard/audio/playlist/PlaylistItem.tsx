import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface PlaylistItemProps {
  id: string;
  titre: string;
  resume: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onRemove: (id: string) => void;
}

export const PlaylistItem = ({
  id,
  titre,
  resume,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: PlaylistItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card/50 hover:bg-card/80 rounded-lg border border-border/50 mb-2">
      <div>
        <h4 className="font-medium">{titre}</h4>
        <p className="text-sm text-muted-foreground">{resume}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onMoveUp(id)}
          disabled={isFirst}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onMoveDown(id)}
          disabled={isLast}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};