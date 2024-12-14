import { Json } from '@/integrations/supabase/types';
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

export type MindMapDatabaseRow = Omit<MindMap, 'data'> & {
  data: Json;
};