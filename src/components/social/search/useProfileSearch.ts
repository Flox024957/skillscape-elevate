import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  pseudo: string;
  image_profile: string;
  current_job?: string;
}

export const useProfileSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ['profileSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      console.log('Recherche avec le terme:', searchQuery);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, pseudo, image_profile, current_job')
        .ilike('pseudo', `%${searchQuery}%`)
        .not('pseudo', 'is', null)
        .order('pseudo')
        .limit(10);

      if (error) {
        console.error('Erreur lors de la recherche:', error);
        throw error;
      }

      console.log('Résultats de recherche:', data);
      return data as SearchResult[];
    },
    enabled: searchQuery.length > 0,
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });
};