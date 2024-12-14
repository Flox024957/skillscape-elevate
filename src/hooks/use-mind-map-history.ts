import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { MindMapHistory, MindMapAction } from '@/types/mind-map';

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

      // Truncate history after current index
      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, { action: action.type, data: action.payload } as MindMapHistory]);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('Error adding to history:', error);
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
      setHistory(data);
      setCurrentIndex(data.length - 1);
    } catch (error) {
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