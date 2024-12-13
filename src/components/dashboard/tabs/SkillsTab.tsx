import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { Json } from "@/integrations/supabase/types";
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

interface UserSkill {
  skill_id: string;
  selected_sections: string[] | null;
  is_mastered: boolean;
  skills: {
    id: string;
    title: string;
    summary: string | null;
    explanation: string | null;
    concrete_action: string | null;
    examples: Json[] | null;
  };
}

const SkillsTab = () => {
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
      
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          selected_sections,
          is_mastered,
          skills (
            id,
            title,
            summary,
            explanation,
            concrete_action,
            examples
          )
        `)
        .eq('user_id', user.id)
        .eq('is_mastered', false);
      
      if (error) throw error;
      
      return (data || []).map(skill => ({
        skill_id: skill.skill_id,
        selected_sections: skill.selected_sections,
        is_mastered: skill.is_mastered,
        skills: {
          ...skill.skills,
          examples: Array.isArray(skill.skills?.examples) ? skill.skills.examples : []
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
      let selectedSections = existingSkill?.selected_sections || [];

      if (!selectedSections.includes(sectionTitle)) {
        selectedSections = [...selectedSections, sectionTitle];
      }

      const { error } = await supabase
        .from('user_skills')
        .upsert({
          user_id: user.id,
          skill_id: skillId,
          selected_sections: selectedSections,
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
      <div className={`space-y-4 ${isMobile ? 'px-2' : ''}`}>
        <SortableContext
          items={userSkills.map(skill => skill.skill_id)}
          strategy={verticalListSortingStrategy}
        >
          {userSkills.map((userSkill) => (
            <SortableSkillItem key={userSkill.skill_id} id={userSkill.skill_id}>
              <Collapsible
                open={openSections.includes(userSkill.skill_id)}
                onOpenChange={() => toggleSection(userSkill.skill_id)}
                className="bg-card rounded-lg border border-border overflow-hidden flex-1"
              >
                <SkillHeader
                  title={userSkill.skills.title}
                  selectedSections={userSkill.selected_sections}
                  skillId={userSkill.skill_id}
                  onAdd={handleAddSkillSection}
                  isMastered={userSkill.is_mastered}
                />
                <SkillContent
                  skillId={userSkill.skill_id}
                  selectedSections={userSkill.selected_sections}
                  summary={userSkill.skills.summary}
                  explanation={userSkill.skills.explanation}
                  concreteAction={userSkill.skills.concrete_action}
                  examples={userSkill.skills.examples}
                  onAdd={handleAddSkillSection}
                />
              </Collapsible>
            </SortableSkillItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SkillsTab;