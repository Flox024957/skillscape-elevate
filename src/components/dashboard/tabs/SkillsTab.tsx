import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableSkillItem from "./skills/SortableSkillItem";
import { useToast } from "@/hooks/use-toast";
import SkillHeader from "./skills/SkillHeader";
import SkillContent from "./skills/SkillContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserSkill } from "@/types/skills";
import { Json } from "@/integrations/supabase/types";
import MasteredSkillsSection from "./skills/MasteredSkillsSection";
import { Separator } from "@/components/ui/separator";

interface SkillsTabProps {
  userId: string;
}

const SkillsTab = ({ userId }: SkillsTabProps) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: userSkills = [] } = useQuery<UserSkill[]>({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data: skills, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          sections_selectionnees,
          skills (
            id,
            titre,
            resume,
            description,
            action_concrete,
            exemples,
            category_id,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;

      const { data: masteredSkills } = await supabase
        .from('user_mastered_skills')
        .select('skill_id')
        .eq('user_id', user.id);

      const masteredSkillIds = new Set((masteredSkills || []).map(s => s.skill_id));
      
      return (skills || []).map(skill => ({
        ...skill,
        is_mastered: masteredSkillIds.has(skill.skill_id),
        skills: {
          ...skill.skills,
          exemples: Array.isArray(skill.skills.exemples) ? skill.skills.exemples : []
        }
      }));
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = userSkills.findIndex(item => item.skill_id === active.id);
      const newIndex = userSkills.findIndex(item => item.skill_id === over.id);
    }
  };

  const handleAddSkillSection = async (skillId: string, sectionTitle: string, content: string | Json[] | null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour effectuer cette action",
          variant: "destructive",
        });
        return;
      }

      if (!content) return;

      const existingSkill = userSkills.find(skill => skill.skill_id === skillId);
      let sections_selectionnees = existingSkill?.sections_selectionnees || [];

      if (!sections_selectionnees.includes(sectionTitle)) {
        sections_selectionnees = [...sections_selectionnees, sectionTitle];
      }

      const { error } = await supabase
        .from('user_skills')
        .upsert({
          user_id: user.id,
          skill_id: skillId,
          sections_selectionnees,
        });

      if (error) {
        console.error('Erreur lors de la mise à jour des sections:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour les sections",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={`space-y-8 ${isMobile ? 'px-2' : ''}`}>
        <div>
          <h2 className="text-lg font-semibold mb-4">Compétences en cours d'apprentissage</h2>
          <SortableContext
            items={userSkills.map(skill => skill.skill_id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {userSkills.map((userSkill) => (
                <SortableSkillItem key={userSkill.skill_id} id={userSkill.skill_id}>
                  <Collapsible
                    open={openSections.includes(userSkill.skill_id)}
                    onOpenChange={() => toggleSection(userSkill.skill_id)}
                    className="bg-card rounded-lg border border-border overflow-hidden flex-1"
                  >
                    <SkillHeader
                      title={userSkill.skills.titre}
                      selectedSections={userSkill.sections_selectionnees}
                      skillId={userSkill.skill_id}
                      onAdd={handleAddSkillSection}
                      isMastered={userSkill.is_mastered}
                    />
                    <SkillContent
                      skillId={userSkill.skill_id}
                      selectedSections={userSkill.sections_selectionnees}
                      summary={userSkill.skills.resume}
                      explanation={userSkill.skills.description}
                      concreteAction={userSkill.skills.action_concrete}
                      examples={userSkill.skills.exemples}
                      onAdd={handleAddSkillSection}
                    />
                  </Collapsible>
                </SortableSkillItem>
              ))}
            </div>
          </SortableContext>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-lg font-semibold mb-4">Compétences maîtrisées</h2>
          <MasteredSkillsSection />
        </div>
      </div>
    </DndContext>
  );
};

export default SkillsTab;