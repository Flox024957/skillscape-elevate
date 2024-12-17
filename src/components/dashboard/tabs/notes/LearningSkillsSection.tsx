import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { UserSkill } from "@/types/skills";
import { SkillContentSection } from "./skills/SkillContentSection";

interface LearningSkillsSectionProps {
  userId: string;
  selectedDate: Date | undefined;
  onAddNote: (note: string, tags: string[]) => void;
}

export const LearningSkillsSection = ({ userId, selectedDate, onAddNote }: LearningSkillsSectionProps) => {
  const [openSkillId, setOpenSkillId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: learningSkills } = useQuery({
    queryKey: ['userSkills', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          *,
          skills (
            id,
            titre,
            resume,
            description,
            action_concrete,
            exemples
          )
        `)
        .eq('user_id', userId)
        .eq('est_maitrisee', false);

      if (error) throw error;
      return data as UserSkill[];
    },
  });

  const handleAddToCalendar = (skillId: string, content: string) => {
    if (!selectedDate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date dans le calendrier",
        variant: "destructive",
      });
      return;
    }

    onAddNote(content, ['skill', skillId]);
    toast({
      title: "Succès",
      description: `Contenu ajouté au ${format(selectedDate, 'dd/MM/yyyy')}`,
    });
  };

  if (!learningSkills?.length) {
    return (
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">
          Aucune compétence en cours d'apprentissage
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Compétences en cours d'apprentissage
      </h3>
      <div className="space-y-2">
        {learningSkills.map((userSkill) => (
          <Collapsible
            key={userSkill.id}
            open={openSkillId === userSkill.id}
            onOpenChange={() => setOpenSkillId(openSkillId === userSkill.id ? null : userSkill.id)}
          >
            <div className="bg-card hover:bg-card/80 rounded-lg border border-border">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4">
                  <span className="font-medium">{userSkill.skills.titre}</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSkillId === userSkill.id && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t border-border">
                  <SkillContentSection 
                    userSkill={userSkill}
                    onAddToCalendar={handleAddToCalendar}
                  />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};