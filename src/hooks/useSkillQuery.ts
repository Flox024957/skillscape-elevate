import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

export const useSkillQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('No skill ID provided');
      }

      // Clean the ID if it comes from a route parameter
      const cleanId = id.replace('skill/', '');
      console.log('Fetching skill with cleaned ID:', cleanId);
      
      const { data: skillData, error: skillError } = await supabase
        .from('skills')
        .select(`
          *,
          categories (
            id,
            name,
            description
          )
        `)
        .eq('id', cleanId)
        .single();

      if (skillError) {
        console.error('Supabase error:', skillError);
        throw skillError;
      }

      if (!skillData) {
        throw new Error('Skill not found');
      }

      return skillData as Skill;
    },
    enabled: Boolean(id),
    retry: false, // Don't retry on error since we're handling 404s
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};