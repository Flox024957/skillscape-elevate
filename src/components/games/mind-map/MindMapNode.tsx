import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { MindMapNodeProps } from "./types";

export const MindMapNode = ({ 
  node,
  nodes,
  onAddChild,
  onUpdate,
  onDelete
}: MindMapNodeProps) => {
  const isRoot = !node.parentId;
  const hasChildren = node.children.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative p-4 mb-4",
        isRoot ? "ml-0" : "ml-8"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "relative p-4 rounded-xl backdrop-blur-sm border border-white/10",
          "bg-gradient-to-br shadow-xl",
          node.color
        )}>
          <Input
            value={node.content}
            onChange={(e) => onUpdate(node.id, e.target.value)}
            className="bg-transparent border-none text-white placeholder-white/50 focus:ring-0"
          />
          
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAddChild(node.id)}
              className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            {!isRoot && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(node.id)}
                className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {hasChildren && (
        <div className="mt-4 space-y-4">
          {node.children.map(child => (
            <MindMapNode
              key={child.id}
              node={child}
              nodes={nodes}
              onAddChild={onAddChild}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};