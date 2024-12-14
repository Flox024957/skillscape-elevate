import { v4 as uuidv4 } from "uuid";
import type { MindMapNodeType } from "./types";

export const useMindMap = () => {
  const addNode = (nodes: MindMapNodeType[], parentId: string | null): MindMapNodeType => {
    return {
      id: uuidv4(),
      content: "Nouvelle idée",
      parentId,
    };
  };

  const updateNode = (nodes: MindMapNodeType[], nodeId: string, content: string): MindMapNodeType[] => {
    return nodes.map((node) =>
      node.id === nodeId ? { ...node, content } : node
    );
  };

  const deleteNode = (nodes: MindMapNodeType[], nodeId: string): MindMapNodeType[] => {
    const childrenIds = getAllChildrenIds(nodes, nodeId);
    return nodes.filter(
      (node) => node.id !== nodeId && !childrenIds.includes(node.id)
    );
  };

  const getAllChildrenIds = (nodes: MindMapNodeType[], nodeId: string): string[] => {
    const children = nodes.filter((node) => node.parentId === nodeId);
    const childrenIds = children.map((child) => child.id);
    const descendantIds = children.flatMap((child) =>
      getAllChildrenIds(nodes, child.id)
    );
    return [...childrenIds, ...descendantIds];
  };

  return {
    addNode,
    updateNode,
    deleteNode,
  };
};