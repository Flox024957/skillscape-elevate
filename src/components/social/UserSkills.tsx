import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface MasteredSkill {
  skill_id: string;
  mastered_at: string;
  skills: {
    id: string;
    title: string;
  };
}

export const UserSkills = ({ userId }: UserSkillsProps) => {
  const { data: userSkills = [] } = useQuery<UserSkill[]>({
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
        .eq('user_id', userId)
        .eq('is_mastered', false);
      
      if (error) throw error;
      return (data || []) as UserSkill[];
    },
  });

  const { data: masteredSkills = [] } = useQuery<MasteredSkill[]>({
    queryKey: ['masteredSkills', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          mastered_at,
          skills (
            id,
            title
          )
        `)
        .eq('user_id', userId)
        .eq('is_mastered', true);
      
      if (error) throw error;
      return (data || []) as MasteredSkill[];
    },
  });

  if (userSkills.length === 0 && masteredSkills.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">Compétences</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {userSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">En cours d'apprentissage</h4>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((userSkill) => (
                <Badge key={userSkill.skill_id} variant="secondary">
                  {userSkill.skills.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {masteredSkills.length > 0 && (
          <div>
            {userSkills.length > 0 && <Separator className="my-4" />}
            <h4 className="text-sm font-medium mb-2">Compétences maîtrisées</h4>
            <div className="flex flex-wrap gap-2">
              {masteredSkills.map((masteredSkill) => (
                <Badge 
                  key={masteredSkill.skill_id} 
                  variant="default"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  {masteredSkill.skills.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};