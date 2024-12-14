import { motion } from "framer-motion";
import { MindMapNode } from "./MindMapNode";
import type { MindMapNodeType } from "./types";

interface MindMapNodeListProps {
  nodes: MindMapNodeType[];
  parentId: string | null;
  level?: number;
  onContentChange: (id: string, content: string) => void;
  onAddChild: (parentId: string) => void;
  onDeleteNode: (id: string) => void;
}

export const MindMapNodeList = ({
  nodes,
  parentId,
  level = 0,
  onContentChange,
  onAddChild,
  onDeleteNode,
}: MindMapNodeListProps) => {
  const childNodes = nodes.filter((node) => node.parentId === parentId);

  const renderNodes = (parentId: string | null, level: number) => {
    const childNodes = nodes.filter((node) => node.parentId === parentId);
    
    return childNodes.length > 0 ? (
      <div className={`ml-${level * 8} mt-4 space-y-4`}>
        {childNodes.map((node) => (
          <motion.div key={node.id}>
            <MindMapNode
              node={node}
              nodes={nodes}
              onAddChild={onAddChild}
              onUpdate={onContentChange}
              onDelete={onDeleteNode}
            />
            {renderNodes(node.id, level + 1)}
          </motion.div>
        ))}
      </div>
    ) : null;
  };

  return renderNodes(parentId, level);
};