import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import type { MindMap, MindMapDatabaseRow } from '@/types/database/mind-map';
import type { MindMapNodeType } from '@/components/games/mind-map/types';

export const useMindMapPersistence = (mindMapId?: string) => {
  const [mindMap, setMindMap] = useState<MindMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (mindMapId) {
      loadMindMap();
    }
    setIsLoading(false);
  }, [mindMapId]);

  const loadMindMap = async () => {
    try {
      const { data, error } = await supabase
        .from('mind_maps')
        .select('*')
        .eq('id', mindMapId)
        .single();

      if (error) throw error;
      
      // Explicit conversion from database row to MindMap
      const dbData = data as MindMapDatabaseRow;
      const mindMapData: MindMap = {
        ...dbData,
        data: dbData.data as unknown as MindMapNodeType[]
      };
      
      setMindMap(mindMapData);
    } catch (error) {
      console.error('Error loading mind map:', error);
      toast({
        title: "Erreur lors du chargement",
        description: "Impossible de charger la carte mentale",
        variant: "destructive"
      });
    }
  };

  const saveMindMap = async (title: string, nodes: MindMapNodeType[]) => {
    try {
      const mindMapData = {
        title,
        data: nodes as unknown as Json,
        updated_at: new Date().toISOString()
      };

      if (mindMapId) {
        const { error } = await supabase
          .from('mind_maps')
          .update(mindMapData)
          .eq('id', mindMapId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('mind_maps')
          .insert({
            ...mindMapData,
            is_template: false
          })
          .select()
          .single();

        if (error) throw error;
        
        const dbData = data as MindMapDatabaseRow;
        const newMindMap: MindMap = {
          ...dbData,
          data: dbData.data as unknown as MindMapNodeType[]
        };
        setMindMap(newMindMap);
      }

      toast({
        title: "Sauvegarde réussie",
        description: "Votre carte mentale a été sauvegardée"
      });
    } catch (error) {
      console.error('Error saving mind map:', error);
      toast({
        title: "Erreur lors de la sauvegarde",
        description: "Impossible de sauvegarder la carte mentale",
        variant: "destructive"
      });
    }
  };

  return {
    mindMap,
    isLoading,
    saveMindMap
  };
};