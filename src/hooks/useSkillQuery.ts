import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: any[];
  category_id: string;
  created_at?: string;
  updated_at?: string;
  categories?: {
    id: string;
    name: string;
    description: string;
  } | null;
}

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
        toast.error("ID de compétence invalide");
        throw new Error('Invalid skill ID');
      }

      console.log('Fetching skill with ID:', id);

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

      if (skillError) {
        console.error('Error fetching skill:', skillError);
        toast.error("Erreur lors du chargement de la compétence");
        throw skillError;
      }

      if (!skillData) {
        console.error('No skill found with ID:', id);
        toast.error("Compétence non trouvée");
        throw new Error('Skill not found');
      }

      console.log('Skill data fetched successfully:', skillData);
      return skillData as Skill;
    },
    enabled: Boolean(id) && isValidUUID(id),
    retry: 1,
  });
};