import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MindMapNodeProps } from "./types";

export const MindMapNode = ({
  node,
  nodes,
  onAddChild,
  onUpdate,
  onDelete,
}: MindMapNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(node.content);
  const isRoot = !node.parentId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(node.id, content);
    setIsEditing(false);
  };

  const nodeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <motion.div
      variants={nodeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative p-4 rounded-lg shadow-lg backdrop-blur-sm ${
        isRoot
          ? "bg-primary/20 border-2 border-primary/50"
          : "bg-background/40 border border-primary/30"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background/50"
            autoFocus
          />
          <Button type="submit" size="sm" variant="ghost">
            <Edit2 className="w-4 h-4" />
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <span
            onClick={() => setIsEditing(true)}
            className="text-lg font-medium cursor-pointer hover:text-primary transition-colors"
          >
            {node.content}
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onAddChild(node.id)}
              size="sm"
              variant="ghost"
              className="hover:bg-primary/20"
            >
              <Plus className="w-4 h-4" />
            </Button>
            {!isRoot && (
              <Button
                onClick={() => onDelete(node.id)}
                size="sm"
                variant="ghost"
                className="hover:bg-destructive/20"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};