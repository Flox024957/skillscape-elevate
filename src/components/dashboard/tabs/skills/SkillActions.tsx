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

      // First check if the skill is already mastered
      const { data: existingMastery, error: checkError } = await supabase
        .from('user_mastered_skills')
        .select('skill_id')
        .eq('user_id', user.id)
        .eq('skill_id', skillId)
        .maybeSingle(); // Use maybeSingle() instead of single()

      if (checkError) throw checkError;
      
      if (existingMastery) {
        throw new Error("Cette compétence est déjà marquée comme maîtrisée");
      }

      // Insert the mastered skill
      const { error: insertError } = await supabase
        .from('user_mastered_skills')
        .insert([{
          user_id: user.id,
          skill_id: skillId,
        }]);

      if (insertError) throw insertError;

      // Remove from user_skills if it exists
      const { error: deleteError } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (deleteError) throw deleteError;
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
          e.stopPropagation(); // Prevent collapsible from toggling
          onAdd(skillId, "title", "content");
        }}
        className="hover:bg-accent"
      >
        <Plus className="h-4 w-4" />
      </Button>
      {!isMastered && (
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation(); // Prevent collapsible from toggling
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