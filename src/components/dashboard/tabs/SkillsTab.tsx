import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableSkillItem from "./skills/SortableSkillItem";
import SkillSection from "./skills/SkillSection";
import ExamplesSection from "./skills/ExamplesSection";

interface UserSkill {
  skill_id: string;
  selected_sections: string[] | null;
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
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const queryClient = useQueryClient();
  
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
      
      // Ensure examples is always an array
      return (data || []).map(item => ({
        ...item,
        skills: {
          ...item.skills,
          examples: Array.isArray(item.skills.examples) ? item.skills.examples : []
        }
      }));
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      toast({
        title: "Success",
        description: "Skill removed from dashboard",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Could not remove skill from dashboard",
        variant: "destructive",
      });
    },
  });

  const handleDeleteSkill = (skillId: string) => {
    deleteSkillMutation.mutate(skillId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = userSkills.findIndex(item => item.skill_id === active.id);
      const newIndex = userSkills.findIndex(item => item.skill_id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(userSkills, oldIndex, newIndex);
        queryClient.setQueryData(['userSkills'], newOrder);
      }
    }
  };

  const handleAddSkillSection = async (skillId: string, sectionTitle: string, content: string | Json[] | null) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add skills",
        variant: "destructive",
      });
      return;
    }

    if (!content) return;

    // Check if the skill is already in the dashboard
    const existingSkill = userSkills.find(skill => skill.skill_id === skillId);
    let selectedSections = existingSkill?.selected_sections || [];

    // Add the new section if it's not already included
    if (!selectedSections.includes(sectionTitle)) {
      selectedSections = [...selectedSections, sectionTitle];
    }

    if (existingSkill) {
      // Update existing skill's selected sections
      const { error } = await supabase
        .from('user_skills')
        .update({ selected_sections: selectedSections })
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) {
        toast({
          title: "Error",
          description: "Could not update skill sections",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Add new skill with selected section
      const { error } = await supabase
        .from('user_skills')
        .insert([{
          user_id: user.id,
          skill_id: skillId,
          selected_sections: [sectionTitle],
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Could not add skill to dashboard",
          variant: "destructive",
        });
        return;
      }
    }

    queryClient.invalidateQueries({ queryKey: ['userSkills'] });
    toast({
      title: "Success",
      description: `Added ${sectionTitle.toLowerCase()} to dashboard`,
    });
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
                        Selected sections: {userSkill.selected_sections.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSkill(userSkill.skill_id);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 pt-0 space-y-4">
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Summary')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Summary"
                      content={userSkill.skills.summary}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Explanation')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Explanation"
                      content={userSkill.skills.explanation}
                      onAdd={handleAddSkillSection}
                    />
                  )}
                  {(!userSkill.selected_sections || userSkill.selected_sections.includes('Concrete Action')) && (
                    <SkillSection
                      skillId={userSkill.skill_id}
                      title="Concrete Action"
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