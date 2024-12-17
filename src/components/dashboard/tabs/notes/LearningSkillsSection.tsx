import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Skill, UserSkill } from "@/types/skills";

interface LearningSkillsSectionProps {
  userId: string;
  selectedDate: Date | undefined;
  onAddNote: (note: string, tags: string[]) => void;
}

interface UserSkillWithDetails extends UserSkill {
  sections_selectionnees: string[] | null;
  skills: Skill & {
    exemples: string[];
  };
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
          id,
          skill_id,
          sections_selectionnees,
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
      
      // Ensure exemples is always an array
      return (data || []).map(skill => ({
        ...skill,
        skills: {
          ...skill.skills,
          exemples: Array.isArray(skill.skills.exemples) ? skill.skills.exemples : []
        }
      })) as UserSkillWithDetails[];
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
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-4">
                    {userSkill.skills.resume && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Résumé</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddToCalendar(userSkill.skills.id, userSkill.skills.resume || '')}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter au calendrier
                          </Button>
                        </div>
                        <p className="text-sm">{userSkill.skills.resume}</p>
                      </div>
                    )}

                    {userSkill.skills.description && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Description</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddToCalendar(userSkill.skills.id, userSkill.skills.description || '')}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter au calendrier
                          </Button>
                        </div>
                        <p className="text-sm">{userSkill.skills.description}</p>
                      </div>
                    )}

                    {userSkill.skills.action_concrete && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Action concrète</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddToCalendar(userSkill.skills.id, userSkill.skills.action_concrete || '')}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter au calendrier
                          </Button>
                        </div>
                        <p className="text-sm">{userSkill.skills.action_concrete}</p>
                      </div>
                    )}

                    {userSkill.skills.exemples && userSkill.skills.exemples.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Exemples</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddToCalendar(
                              userSkill.skills.id,
                              `Exemples:\n${userSkill.skills.exemples.map((ex: string) => `- ${ex}`).join('\n')}`
                            )}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter au calendrier
                          </Button>
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {userSkill.skills.exemples.map((exemple: string, index: number) => (
                            <li key={index}>{exemple}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {userSkill.sections_selectionnees && userSkill.sections_selectionnees.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                        {userSkill.sections_selectionnees.map((section) => (
                          <Badge key={section} variant="secondary">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};