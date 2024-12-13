import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import SkillSection from "./skills/SkillSection";
import ExamplesSection from "./skills/ExamplesSection";
import SkillActions from "./skills/SkillActions";

interface UserSkill {
  skill_id: string;
  selected_sections: string[] | null;
  is_mastered?: boolean;
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
          selected_sections,
          skills (
            id,
            title,
            summary,
            explanation,
            concrete_action,
            examples
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;

      // Get mastered skills to mark them in the list
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
          examples: Array.isArray(skill.skills.examples) ? skill.skills.examples : []
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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
      return;
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
      <div className="space-y-4">
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
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-accent/50">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {userSkill.skills.title}
                    </h3>
                    {userSkill.selected_sections && (
                      <p className="text-sm text-muted-foreground">
                        Sections sélectionnées : {userSkill.selected_sections.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <SkillActions
                      skillId={userSkill.skill_id}
                      onAdd={handleAddSkillSection}
                      isMastered={userSkill.is_mastered}
                    />
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 pt-0 space-y-4">
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Summary')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Résumé"
                      content={userSkill.skills.summary}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Explanation')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Explication"
                      content={userSkill.skills.explanation}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Concrete Action')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Action Concrète"
                      content={userSkill.skills.concrete_action}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Examples')) && (
                    <ExamplesSection
                      skillId={userSkill.skill_id}
                      examples={userSkill.skills.examples as Json[]}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                </CollapsibleContent>
              </Collapsible>
            </SortableSkillItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SkillsTab;