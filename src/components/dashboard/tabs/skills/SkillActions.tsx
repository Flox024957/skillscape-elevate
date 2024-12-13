import { Button } from "@/components/ui/button";
import { Trash, Check } from "lucide-react";
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

  const deleteSkillMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error: deleteError } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      toast({
        title: "Succès",
        description: "Compétence supprimée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de supprimer la compétence",
        variant: "destructive",
      });
    },
  });

  const markAsMasteredMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error: updateError } = await supabase
        .from('user_skills')
        .update({
          est_maitrisee: true,
          maitrisee_le: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      queryClient.invalidateQueries({ queryKey: ['masteredSkills'] });
      toast({
        title: "Succès",
        description: "Compétence marquée comme maîtrisée",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de marquer la compétence comme maîtrisée",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          deleteSkillMutation.mutate();
        }}
        className="hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash className="h-4 w-4" />
      </Button>
      {!isMastered && (
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            markAsMasteredMutation.mutate();
          }}
          className="hover:bg-green-500/10 hover:text-green-500"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SkillActions;