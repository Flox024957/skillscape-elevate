import { Card } from "@/components/ui/card";
import { CategorySelect } from "./CategorySelect";
import { SkillsList } from "./SkillsList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skill } from "@/types/skill";

export const SkillsSection = () => {
  const { data: skills = [] } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          categories (
            id,
            name
          )
        `);
      
      if (error) throw error;
      return data as Skill[];
    },
  });

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <div className="space-y-4">
        <CategorySelect 
          categories={[]} 
          onSelect={() => {}}
        />
        <SkillsList skills={skills} />
      </div>
    </Card>
  );
};