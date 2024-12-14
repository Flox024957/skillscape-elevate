import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface MindMapNodeProps {
  id: string;
  content: string;
  onContentChange: (id: string, content: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  isRoot?: boolean;
}

export const MindMapNode = ({
  id,
  content,
  onContentChange,
  onAddChild,
  onDelete,
  isRoot = false,
}: MindMapNodeProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative"
    >
      <Card className={`p-2 ${isRoot ? 'bg-primary/20' : 'bg-card/50'} backdrop-blur-sm border-primary/20`}>
        <div className="flex items-center gap-2">
          <Input
            value={content}
            onChange={(e) => onContentChange(id, e.target.value)}
            className="min-w-[150px] bg-background/50"
            placeholder="Entrez votre texte..."
          />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAddChild(id)}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
            {!isRoot && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(id)}
                className="h-8 w-8 text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};