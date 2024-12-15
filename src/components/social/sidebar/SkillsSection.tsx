import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SkillsSection = () => {
  const { data: userSkills = [] } = useQuery({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data: skills } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          sections_selectionnees,
          skills (
            id,
            titre
          )
        `)
        .eq('user_id', user.id);
      
      return skills || [];
    },
  });

  const { data: masteredSkills = [] } = useQuery({
    queryKey: ['masteredSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from('user_mastered_skills')
        .select(`
          skill_id,
          skills (
            id,
            titre
          )
        `)
        .eq('user_id', user.id);
      
      return data || [];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Book className="w-4 h-4" />
            Mastered Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {masteredSkills.map((skill) => (
              <Badge key={skill.skill_id} variant="default">
                {skill.skills.titre}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning
          </h4>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill) => (
              <Badge 
                key={skill.skill_id} 
                variant="secondary"
                className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
              >
                {skill.skills.titre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};