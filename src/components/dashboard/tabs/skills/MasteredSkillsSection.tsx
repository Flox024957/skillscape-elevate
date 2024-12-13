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
        .from('user_mastered_skills')
        .select(`
          skill_id,
          mastered_at,
          notes,
          skills (
            id,
            titre,
            resume
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const removeMasteredSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error } = await supabase
        .from('user_mastered_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masteredSkills'] });
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      toast({
        title: "Succès",
        description: "Compétence retirée des compétences maîtrisées",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de retirer la compétence",
        variant: "destructive",
      });
    },
  });

  if (!masteredSkills.length) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Aucune compétence maîtrisée pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {masteredSkills.map((skill) => (
        <div key={skill.skill_id} className="bg-card/50 p-4 rounded-lg border border-border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{skill.skills.titre}</h3>
              {skill.skills.resume && (
                <p className="text-sm text-muted-foreground mt-1">{skill.skills.resume}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Maîtrisée le {new Date(skill.mastered_at).toLocaleDateString()}
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
