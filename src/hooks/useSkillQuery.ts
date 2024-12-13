import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const useSkillQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      if (!id || !isValidUUID(id)) {
        console.error('Invalid skill ID:', id);
        throw new Error('Invalid skill ID');
      }

      const { data: skillData, error: skillError } = await supabase
        .from('skills')
        .select(`
          *,
          categories (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (skillError) {
        console.error('Error fetching skill:', skillError);
        throw skillError;
      }

      if (!skillData) {
        console.error('No skill found with ID:', id);
        throw new Error('Skill not found');
      }

      return skillData as Skill;
    },
    enabled: Boolean(id) && isValidUUID(id),
    retry: false, // Disable retries for 404s
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};