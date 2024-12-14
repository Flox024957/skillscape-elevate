export interface MindMapNodeType {
  id: string;
  content: string;
  parentId: string | null;
  color?: string;
}

export interface MindMapState {
  nodes: MindMapNodeType[];
}

// Type pour la conversion entre Supabase et l'application
export type MindMapNodeData = {
  id: string;
  content: string;
  parentId: string | null;
  color?: string;
};