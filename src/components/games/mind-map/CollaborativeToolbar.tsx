import { Users, Save, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMindMapCollaboration } from "@/hooks/use-mind-map-collaboration";

interface CollaborativeToolbarProps {
  mindMapId: string;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const CollaborativeToolbar = ({
  mindMapId,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: CollaborativeToolbarProps) => {
  const { activeUsers } = useMindMapCollaboration(mindMapId);

  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          {activeUsers.size} en ligne
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUndo}
              disabled={!canUndo}
              className="hover:bg-primary/10"
            >
              <Undo className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Annuler (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRedo}
              disabled={!canRedo}
              className="hover:bg-primary/10"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rétablir (Ctrl+Y)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSave}
              className="hover:bg-primary/10"
            >
              <Save className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sauvegarder (Ctrl+S)</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};