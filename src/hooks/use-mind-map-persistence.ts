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
    if (!mindMapId) {
      setIsLoading(false);
      return;
    }

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
          title: "Erreur",
          description: "Impossible de charger la carte mentale",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMindMap();
  }, [mindMapId]);

  const saveMindMap = async (title: string, nodes: MindMapNodeType[]) => {
    if (!mindMap) return;

    try {
      const { error } = await supabase
        .from('mind_maps')
        .update({
          title,
          data: nodes as unknown as Json,
          updated_at: new Date().toISOString()
        })
        .eq('id', mindMap.id);

      if (error) throw error;

      setMindMap({
        ...mindMap,
        title,
        data: nodes,
        updated_at: new Date().toISOString()
      });

      toast({
        title: "Succès",
        description: "Carte mentale mise à jour"
      });
    } catch (error) {
      console.error('Error updating mind map:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la carte mentale",
        variant: "destructive"
      });
    }
  };

  const updateMindMap = async (nodes: MindMapNodeType[]) => {
    if (!mindMap) return;

    try {
      const { error } = await supabase
        .from('mind_maps')
        .update({
          data: nodes as unknown as Json,
          updated_at: new Date().toISOString()
        })
        .eq('id', mindMap.id);

      if (error) throw error;

      setMindMap({
        ...mindMap,
        data: nodes,
        updated_at: new Date().toISOString()
      });

      toast({
        title: "Succès",
        description: "Carte mentale mise à jour"
      });
    } catch (error) {
      console.error('Error updating mind map:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la carte mentale",
        variant: "destructive"
      });
    }
  };

  const createMindMap = async (title: string) => {
    try {
      const { data, error } = await supabase
        .from('mind_maps')
        .insert({
          is_template: false,
          title,
          data: [] as unknown as Json,
          updated_at: new Date().toISOString()
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

      toast({
        title: "Succès",
        description: "Nouvelle carte mentale créée"
      });

      return newMindMap;
    } catch (error) {
      console.error('Error creating mind map:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la carte mentale",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    mindMap,
    isLoading,
    saveMindMap,
    updateMindMap,
    createMindMap
  };
};