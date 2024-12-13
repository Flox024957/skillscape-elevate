import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserSkill } from "@/types/skills";

export const useUserSkills = () => {
  return useQuery<UserSkill[]>({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          sections_selectionnees,
          est_maitrisee,
          maitrisee_le,
          skills (
            id,
            category_id,
            titre,
            resume,
            explication,
            action_concrete,
            exemples,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id)
        .eq('est_maitrisee', false);
      
      if (error) throw error;
      return data as UserSkill[];
    },
  });
};