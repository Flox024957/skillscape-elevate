import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { MindMapHistory, MindMapAction } from '@/types/database/mind-map';

export const useMindMapHistory = (mindMapId: string) => {
  const [history, setHistory] = useState<MindMapHistory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { toast } = useToast();

  const addToHistory = async (action: MindMapAction) => {
    try {
      const { error } = await supabase
        .from('mind_map_history')
        .insert({
          mind_map_id: mindMapId,
          action: action.type,
          data: action.payload
        });

      if (error) throw error;

      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, { 
        id: '', // Will be set by Supabase
        mind_map_id: mindMapId,
        user_id: '', // Will be set by RLS
        action: action.type,
        data: action.payload,
        created_at: new Date().toISOString()
      }]);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('Error adding to history:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter à l'historique",
        variant: "destructive"
      });
    }
  };

  const undo = () => {
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex];
    }
    return null;
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
    return null;
  };

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('mind_map_history')
        .select('*')
        .eq('mind_map_id', mindMapId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setHistory(data as MindMapHistory[]);
      setCurrentIndex(data.length - 1);
    } catch (error) {
      console.error('Error loading history:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique",
        variant: "destructive"
      });
    }
  };

  return {
    history,
    currentIndex,
    addToHistory,
    undo,
    redo,
    loadHistory
  };
};