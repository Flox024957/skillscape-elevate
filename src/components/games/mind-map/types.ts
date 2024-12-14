export interface MindMapNodeType {
  id: string;
  content: string;
  parentId: string | null;
  color?: string;
}

export interface MindMapState {
  nodes: MindMapNodeType[];
}