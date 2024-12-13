import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MasteredSkill } from "@/types/skills";

const MasteredSkillsSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: masteredSkills = [] } = useQuery<MasteredSkill[]>({
    queryKey: ['masteredSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          mastered_at,
          skills (
            id,
            title,
            summary
          )
        `)
        .eq('user_id', user.id)
        .eq('is_mastered', true);

      if (error) throw error;
      return data || [];
    },
  });

  const removeMasteredSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('user_skills')
        .update({ 
          is_mastered: false, 
          mastered_at: null 
        })
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masteredSkills'] });
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      toast({
        title: "Success",
        description: "Skill removed from mastered skills",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to remove skill",
        variant: "destructive",
      });
    },
  });

  if (!masteredSkills.length) {
    return (
      <div className="text-center text-muted-foreground p-4">
        No mastered skills yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {masteredSkills.map((skill) => (
        <div key={skill.skill_id} className="bg-card/50 p-4 rounded-lg border border-border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{skill.skills.title}</h3>
              {skill.skills.summary && (
                <p className="text-sm text-muted-foreground mt-1">{skill.skills.summary}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Mastered on {new Date(skill.mastered_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeMasteredSkillMutation.mutate(skill.skill_id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasteredSkillsSection;