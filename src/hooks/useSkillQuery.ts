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
      console.log('Fetching skill with ID:', id);

      if (!id) {
        console.error('No skill ID provided');
        throw new Error('No skill ID provided');
      }

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

      console.log('Supabase response:', { skillData, skillError });

      if (skillError) {
        console.error('Supabase error:', skillError);
        throw skillError;
      }

      if (!skillData) {
        console.error('No skill found for ID:', id);
        throw new Error('Skill not found');
      }

      console.log('Successfully fetched skill:', skillData);
      return skillData as Skill;
    },
    enabled: Boolean(id),
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
      }
    }
  });
};