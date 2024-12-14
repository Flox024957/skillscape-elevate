import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { MindMapNodeType } from "./types";

const colors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500"
];

export const useMindMap = () => {
  const [nodes, setNodes] = useState<MindMapNodeType[]>([
    { 
      id: "root", 
      content: "Idée principale", 
      parentId: null,
      color: "from-primary to-primary-foreground"
    },
  ]);

  const handleContentChange = (id: string, content: string) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, content } : node))
    );
  };

  const handleAddChild = (parentId: string) => {
    const parentNode = nodes.find(node => node.id === parentId);
    const childrenCount = nodes.filter(node => node.parentId === parentId).length;
    const colorIndex = childrenCount % colors.length;
    
    const newNode: MindMapNodeType = {
      id: uuidv4(),
      content: "",
      parentId,
      color: parentNode?.parentId === null ? colors[colorIndex] : parentNode?.color
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((prev) => {
      const nodesToDelete = [id];
      let currentIds = [id];

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

  const resetNodes = () => {
    setNodes([
      { 
        id: "root", 
        content: "Idée principale", 
        parentId: null,
        color: "from-primary to-primary-foreground"
      },
    ]);
  };

  const setNodesData = (newNodes: MindMapNodeType[]) => {
    setNodes(newNodes);
  };

  return {
    nodes,
    handleContentChange,
    handleAddChild,
    handleDeleteNode,
    resetNodes,
    setNodesData,
  };
};