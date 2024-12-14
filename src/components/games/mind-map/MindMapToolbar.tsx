import { Button } from "@/components/ui/button";
import { Plus, Undo, Redo } from "lucide-react";
import type { MindMapToolbarProps } from "./types";

export const MindMapToolbar = ({
  onAddNode,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: MindMapToolbarProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onRedo}
        disabled={!canRedo}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Button
        variant="default"
        size="icon"
        onClick={onAddNode}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};