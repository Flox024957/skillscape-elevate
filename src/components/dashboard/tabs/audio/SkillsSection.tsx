import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsSectionProps {
  onContentSelect: (content: string) => void;
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
  };
}

export const SkillsSection = ({ onContentSelect, filters }: SkillsSectionProps) => {
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { data: skills } = useQuery({
    queryKey: ['skills', filters],
    queryFn: async () => {
      let query = supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume,
          description,
          categories (
            name
          )
        `)
        .order('titre');

      if (filters.userSkillsOnly) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.in('id', (await supabase
            .from('user_skills')
            .select('skill_id')
            .eq('user_id', user.id)
            .eq('est_maitrisee', filters.includeMastered)
          ).data?.map(s => s.skill_id) || []);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getSkillContent = (skill: any) => {
    return `${skill.titre}. ${skill.resume}. ${skill.description}`;
  };

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handlePlaySelected = () => {
    if (selectedSkills.length === 0) {
      toast({
        title: "Aucune compétence sélectionnée",
        description: "Veuillez sélectionner au moins une compétence à lire",
        variant: "destructive",
      });
      return;
    }

    const selectedContent = skills
      ?.filter(skill => selectedSkills.includes(skill.id))
      .map(skill => getSkillContent(skill))
      .join(". ");

    if (selectedContent) {
      onContentSelect(selectedContent);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Compétences</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlaySelected}
            disabled={selectedSkills.length === 0}
          >
            <Play className="w-4 h-4 mr-2" />
            Lire la sélection
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="space-y-2">
            {skills?.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSkillSelect(skill.id)}
                  className={`flex-1 justify-start ${
                    selectedSkills.includes(skill.id) ? "bg-accent" : ""
                  }`}
                >
                  {index + 1}. {skill.titre}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onContentSelect(getSkillContent(skill))}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};