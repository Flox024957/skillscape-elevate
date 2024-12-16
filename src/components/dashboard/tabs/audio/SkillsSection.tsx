import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface SkillsSectionProps {
  onContentSelect: (content: string) => void;
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
    playbackSpeed: number;
  };
}

export const SkillsSection = ({ 
  onContentSelect, 
  onSkillSelect,
  selectedSkills,
  filters 
}: SkillsSectionProps) => {
  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ['skills', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume
        `);

      if (filters.userSkillsOnly) {
        query = query.in('id', (await supabase
          .from('user_skills')
          .select('skill_id')
          .eq('user_id', user.id)
          .then(({ data }) => data?.map(s => s.skill_id) || [])));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div 
          key={skill.id}
          className="flex items-start justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}.
              </span>
              <h4 className="text-base font-medium group-hover:text-primary transition-colors">
                {skill.titre}
              </h4>
            </div>
            {skill.resume && (
              <p className="text-sm text-muted-foreground mt-1 ml-6">
                {skill.resume}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSkillSelect(skill.id)}
              className={selectedSkills.includes(skill.id) 
                ? "bg-primary/10 text-primary hover:bg-primary/20" 
                : "hover:bg-primary/10"}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onContentSelect(skill.resume || skill.titre)}
              className="hover:bg-primary/10"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};