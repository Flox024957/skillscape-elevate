import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserSkillsProps {
  userId: string;
}

interface UserSkill {
  skill_id: string;
  selected_sections: string[] | null;
  skills: {
    id: string;
    title: string;
  };
}

export const UserSkills = ({ userId }: UserSkillsProps) => {
  const { data: userSkills = [] } = useQuery({
    queryKey: ['userSkills', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          selected_sections,
          skills (
            id,
            title
          )
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data as UserSkill[];
    },
  });

  if (userSkills.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">Compétences</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {userSkills.map((userSkill) => (
            <Badge key={userSkill.skill_id} variant="secondary">
              {userSkill.skills.title}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};