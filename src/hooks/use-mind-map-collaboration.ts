import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { MindMapCollaborator } from '@/types/database/mind-map';
import type { RealtimeChannel } from '@supabase/supabase-js';

export const useMindMapCollaboration = (mindMapId: string) => {
  const [collaborators, setCollaborators] = useState<MindMapCollaborator[]>([]);
  const [activeUsers, setActiveUsers] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (!mindMapId) return;

    loadCollaborators();

    const channel = supabase
      .channel(`mindmap:${mindMapId}`)
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users = new Set(Object.keys(newState));
        setActiveUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        toast({
          title: "Nouveau collaborateur",
          description: `${key} a rejoint la session`
        });
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        toast({
          title: "Collaborateur déconnecté",
          description: `${key} a quitté la session`
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user: supabase.auth.getUser(),
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mindMapId]);

  const loadCollaborators = async () => {
    try {
      const { data, error } = await supabase
        .from('mind_map_collaborators')
        .select('*')
        .eq('mind_map_id', mindMapId);

      if (error) throw error;
      setCollaborators(data as MindMapCollaborator[]);
    } catch (error) {
      console.error('Error loading collaborators:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les collaborateurs",
        variant: "destructive"
      });
    }
  };

  const addCollaborator = async (userId: string, role: 'viewer' | 'editor' = 'viewer') => {
    try {
      const { error } = await supabase
        .from('mind_map_collaborators')
        .insert({
          mind_map_id: mindMapId,
          user_id: userId,
          role
        });

      if (error) throw error;
      
      toast({
        title: "Collaborateur ajouté",
        description: "Le collaborateur a été ajouté avec succès"
      });
      
      loadCollaborators();
    } catch (error) {
      console.error('Error adding collaborator:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le collaborateur",
        variant: "destructive"
      });
    }
  };

  const removeCollaborator = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('mind_map_collaborators')
        .delete()
        .eq('mind_map_id', mindMapId)
        .eq('user_id', userId);

      if (error) throw error;
      
      toast({
        title: "Collaborateur retiré",
        description: "Le collaborateur a été retiré avec succès"
      });
      
      loadCollaborators();
    } catch (error) {
      console.error('Error removing collaborator:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le collaborateur",
        variant: "destructive"
      });
    }
  };

  return {
    collaborators,
    activeUsers,
    addCollaborator,
    removeCollaborator
  };
};