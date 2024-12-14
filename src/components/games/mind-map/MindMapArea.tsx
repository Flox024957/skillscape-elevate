import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Save } from "lucide-react";
import { MindMapNode } from "./MindMapNode";
import { v4 as uuidv4 } from "uuid";

interface MindMapNode {
  id: string;
  content: string;
  parentId: string | null;
}

export const MindMapArea = () => {
  const [nodes, setNodes] = useState<MindMapNode[]>([
    { id: "root", content: "Idée principale", parentId: null },
  ]);

  const handleContentChange = (id: string, content: string) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, content } : node))
    );
  };

  const handleAddChild = (parentId: string) => {
    const newNode: MindMapNode = {
      id: uuidv4(),
      content: "",
      parentId,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((prev) => {
      const nodesToDelete = [id];
      let currentIds = [id];

      // Récupérer tous les nœuds enfants récursivement
      while (currentIds.length > 0) {
        const childNodes = prev.filter((node) =>
          currentIds.includes(node.parentId || "")
        );
        const childIds = childNodes.map((node) => node.id);
        nodesToDelete.push(...childIds);
        currentIds = childIds;
      }

      return prev.filter((node) => !nodesToDelete.includes(node.id));
    });
  };

  const renderNodes = (parentId: string | null = null, level = 0) => {
    const childNodes = nodes.filter((node) => node.parentId === parentId);

    return (
      <div
        className={`flex flex-col gap-4 ${
          parentId ? "ml-8 pl-4 border-l border-primary/20" : ""
        }`}
      >
        <AnimatePresence>
          {childNodes.map((node) => (
            <motion.div key={node.id}>
              <MindMapNode
                id={node.id}
                content={node.content}
                onContentChange={handleContentChange}
                onAddChild={handleAddChild}
                onDelete={handleDeleteNode}
                isRoot={!parentId}
              />
              {renderNodes(node.id, level + 1)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Mind Map Masters
              </h2>
            </div>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" />
              Sauvegarder
            </Button>
          </div>

          <div className="min-h-[400px] p-4 bg-background/30 rounded-lg border border-primary/10">
            {renderNodes()}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};