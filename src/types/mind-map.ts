import type { MindMapNodeType } from '@/components/games/mind-map/types';

export interface MindMap {
  id: string;
  title: string;
  data: MindMapNodeType[];
  is_template: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface MindMapCollaborator {
  id: string;
  mind_map_id: string;
  user_id: string;
  role: 'viewer' | 'editor';
  created_at: string;
}

export interface MindMapHistory {
  id: string;
  mind_map_id: string;
  user_id: string;
  action: string;
  data: any;
  created_at: string;
}

export interface MindMapAction {
  type: 'ADD_NODE' | 'UPDATE_NODE' | 'DELETE_NODE' | 'UNDO' | 'REDO';
  payload: any;
}