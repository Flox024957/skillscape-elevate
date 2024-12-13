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
      console.log('Starting skill fetch for ID:', id);
      
      if (!id) {
        console.error('No skill ID provided');
        throw new Error('No skill ID provided');
      }

      // Fetch skill with category in a single query
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
        .eq('id', id)
        .single();

      console.log('Raw skill query result:', { skillData, skillError });

      if (skillError) {
        console.error('Error fetching skill:', skillError);
        throw skillError;
      }

      if (!skillData) {
        console.error('No skill found with ID:', id);
        throw new Error('Skill not found');
      }

      console.log('Successfully fetched skill data:', skillData);
      return skillData as Skill;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
};