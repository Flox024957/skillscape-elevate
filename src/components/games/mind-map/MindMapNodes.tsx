import { motion } from "framer-motion";
import { MindMapNode } from "./MindMapNode";
import type { MindMapNodeType } from "./types";

interface MindMapNodesProps {
  nodes: MindMapNodeType[];
  onAddChild: (parentId: string) => void;
  onUpdate: (nodeId: string, content: string) => void;
  onDelete: (nodeId: string) => void;
}

export const MindMapNodes = ({
  nodes,
  onAddChild,
  onUpdate,
  onDelete
}: MindMapNodesProps) => {
  return (
    <div className="mt-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
      <div className="relative z-10">
        {nodes.map(node => (
          <MindMapNode
            key={node.id}
            node={node}
            nodes={nodes}
            onAddChild={onAddChild}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};