import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MindMapNodeProps {
  id: string;
  content: string;
  color?: string;
  onContentChange: (id: string, content: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  isRoot?: boolean;
}

export const MindMapNode = ({
  id,
  content,
  color,
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
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "p-2 backdrop-blur-sm border-primary/20 overflow-hidden",
          isRoot ? "bg-gradient-to-r from-primary to-primary-foreground" : "bg-gradient-to-r",
          color
        )}
      >
        <div className="flex items-center gap-2">
          <Input
            value={content}
            onChange={(e) => onContentChange(id, e.target.value)}
            className={cn(
              "min-w-[150px] bg-background/50 border-0 focus-visible:ring-1 focus-visible:ring-white",
              isRoot && "text-white placeholder:text-white/70"
            )}
            placeholder={isRoot ? "Idée principale..." : "Nouvelle idée..."}
          />
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAddChild(id)}
              className={cn(
                "h-8 w-8 hover:bg-white/20",
                isRoot && "text-white hover:text-white"
              )}
            >
              <Plus className="h-4 w-4" />
            </Button>
            {!isRoot && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(id)}
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
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