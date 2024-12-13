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
        throw new Error('ID de compétence manquant');
      }

      const { data: skill, error } = await supabase
        .from('skills')
        .select(`
          *,
          categories (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération de la compétence:', error);
        throw error;
      }

      if (!skill) {
        throw new Error('Compétence non trouvée');
      }

      return skill as Skill;
    },
    enabled: Boolean(id),
  });
};