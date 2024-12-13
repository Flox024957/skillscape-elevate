import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SkillActionsProps {
  skillId: string;
  onAdd: (skillId: string, title: string, content: string | null) => void;
  isMastered?: boolean;
}

const SkillActions = ({ skillId, onAdd, isMastered }: SkillActionsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const markAsMasteredMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error } = await supabase
        .from('user_mastered_skills')
        .insert([{
          user_id: user.id,
          skill_id: skillId,
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      queryClient.invalidateQueries({ queryKey: ['masteredSkills'] });
      toast({
        title: "Succès",
        description: "Compétence marquée comme maîtrisée",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de marquer la compétence comme maîtrisée",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onAdd(skillId, "title", "content")}
        className="hover:bg-accent"
      >
        <Plus className="h-4 w-4" />
      </Button>
      {!isMastered && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => markAsMasteredMutation.mutate()}
          className="hover:bg-green-500/10 hover:text-green-500"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SkillActions;