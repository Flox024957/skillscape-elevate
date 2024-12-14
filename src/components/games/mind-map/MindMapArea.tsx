import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MindMapNode } from "./MindMapNode";
import { MindMapToolbar } from "./MindMapToolbar";
import { CollaborativeToolbar } from "./CollaborativeToolbar";
import { useMindMap } from "./useMindMap";
import { useMindMapPersistence } from "@/hooks/use-mind-map-persistence";
import { useMindMapHistory } from "@/hooks/use-mind-map-history";
import type { MindMapNodeType } from "./types";

export const MindMapArea = () => {
  const [nodes, setNodes] = useState<MindMapNodeType[]>([]);
  const { mindMap, isLoading, saveMindMap, updateMindMap } = useMindMapPersistence();
  const { addNode, updateNode, deleteNode } = useMindMap();
  const { history, currentIndex, addToHistory, undo, redo } = useMindMapHistory(mindMap?.id || "");

  useEffect(() => {
    if (mindMap) {
      setNodes(mindMap.data);
    }
  }, [mindMap]);

  const handleAddNode = (parentId: string | null) => {
    const newNode = addNode(nodes, parentId);
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    updateMindMap(updatedNodes);
    addToHistory({ type: "add", payload: newNode });
  };

  const handleUpdateNode = (nodeId: string, content: string) => {
    const updatedNodes = updateNode(nodes, nodeId, content);
    setNodes(updatedNodes);
    updateMindMap(updatedNodes);
    addToHistory({ type: "update", payload: { id: nodeId, content } });
  };

  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = deleteNode(nodes, nodeId);
    setNodes(updatedNodes);
    updateMindMap(updatedNodes);
    addToHistory({ type: "delete", payload: { id: nodeId } });
  };

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setNodes(previousState.data);
      updateMindMap(previousState.data);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setNodes(nextState.data);
      updateMindMap(nextState.data);
    }
  };

  const handleSave = () => {
    if (mindMap) {
      saveMindMap(mindMap.title, nodes);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-[600px] bg-background/50 backdrop-blur-sm rounded-xl shadow-lg p-8"
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between gap-4">
        <MindMapToolbar onAddNode={() => handleAddNode(null)} />
        <CollaborativeToolbar
          mindMapId={mindMap?.id || ""}
          onSave={handleSave}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={currentIndex > 0}
          canRedo={currentIndex < history.length - 1}
        />
      </div>

      <div className="mt-20 flex items-center justify-center">
        <div className="relative">
          {nodes.map((node) => (
            <MindMapNode
              key={node.id}
              node={node}
              nodes={nodes}
              onAddChild={(parentId) => handleAddNode(parentId)}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};