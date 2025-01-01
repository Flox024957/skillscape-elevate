import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategorySelect } from "./skills/CategorySelect";
import { SkillsList } from "./skills/SkillsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skill } from "@/types/skill";

interface SkillsSectionProps {
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
    playbackSpeed: number;
    categoryId?: string;
  };
}

export const SkillsSection = ({ 
  onSkillSelect,
  selectedSkills,
  filters 
}: SkillsSectionProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['skills', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume,
          description,
          action_concrete,
          exemples,
          category_id,
          categories (
            id,
            name
          )
        `);

      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters.userSkillsOnly) {
        const { data: userSkills } = await supabase
          .from('user_skills')
          .select('skill_id')
          .eq('user_id', user.id);
        
        if (userSkills) {
          query = query.in('id', userSkills.map(s => s.skill_id));
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as Skill[];
    },
  });

  return (
    <div className="space-y-4">
      <CategorySelect 
        categories={categories} 
        onSelect={onSkillSelect} 
      />
      <ScrollArea className="h-[772px] rounded-md border p-4">
        <SkillsList skills={skills} />
      </ScrollArea>
    </div>
  );
};