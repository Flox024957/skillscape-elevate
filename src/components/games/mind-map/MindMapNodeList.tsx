import { motion, AnimatePresence } from "framer-motion";
import { MindMapNode } from "./MindMapNode";
import type { MindMapNodeType } from "./types";

interface MindMapNodeListProps {
  nodes: MindMapNodeType[];
  onContentChange: (id: string, content: string) => void;
  onAddChild: (parentId: string) => void;
  onDeleteNode: (id: string) => void;
}

export const MindMapNodeList = ({
  nodes,
  onContentChange,
  onAddChild,
  onDeleteNode,
}: MindMapNodeListProps) => {
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
                color={node.color}
                onContentChange={onContentChange}
                onAddChild={onAddChild}
                onDelete={onDeleteNode}
                isRoot={!parentId}
              />
              {renderNodes(node.id, level + 1)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return renderNodes();
};