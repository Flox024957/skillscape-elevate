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
  nodes: MindMapNodeType[];
  onAddChild: (parentId: string) => void;
  onUpdate: (nodeId: string, content: string) => void;
  onDelete: (nodeId: string) => void;
}

export interface MindMapToolbarProps {
  onAddNode: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface MindMapAction {
  type: 'ADD_NODE' | 'UPDATE_NODE' | 'DELETE_NODE' | 'UNDO' | 'REDO';
  payload: any;
}