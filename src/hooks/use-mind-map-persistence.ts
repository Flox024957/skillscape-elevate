import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { MindMap, MindMapNode } from '@/types/database/mind-map';

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
      setMindMap(data as MindMap);
    } catch (error) {
      console.error('Error loading mind map:', error);
      toast({
        title: "Erreur lors du chargement",
        description: "Impossible de charger la carte mentale",
        variant: "destructive"
      });
    }
  };

  const saveMindMap = async (title: string, nodes: MindMapNode[], isTemplate = false) => {
    try {
      if (mindMapId) {
        const { error } = await supabase
          .from('mind_maps')
          .update({
            title,
            data: nodes,
            updated_at: new Date().toISOString()
          })
          .eq('id', mindMapId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('mind_maps')
          .insert({
            title,
            data: nodes,
            is_template: isTemplate
          })
          .select()
          .single();

        if (error) throw error;
        setMindMap(data as MindMap);
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