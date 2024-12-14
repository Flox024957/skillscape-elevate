export interface MindMapNodeType {
  id: string;
  content: string;
  parentId: string | null;
  x?: number;
  y?: number;
  color?: string;
}

export interface MindMapNodeProps {
  node: MindMapNodeType;
  onUpdate: (node: MindMapNodeType) => void;
  onDelete: (id: string) => void;
  isEditable?: boolean;
}

export interface MindMapAreaProps {
  nodes: MindMapNodeType[];
  onNodesChange: (nodes: MindMapNodeType[]) => void;
  isEditable?: boolean;
}

export interface MindMapToolbarProps {
  onAddNode: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isEditable?: boolean;
}