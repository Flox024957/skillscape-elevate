import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserSkills } from "@/hooks/useUserSkills";
import SortableSkillItem from "./skills/SortableSkillItem";
import SkillHeader from "./skills/SkillHeader";
import SkillContent from "./skills/SkillContent";
import { Collapsible } from "@/components/ui/collapsible";

const SkillsTab = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { data: userSkills = [] } = useUserSkills();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = userSkills.findIndex(item => item.skill_id === active.id);
      const newIndex = userSkills.findIndex(item => item.skill_id === over.id);
      // Handle reordering logic here if needed
    }
  };

  const handleAddSkillSection = async (skillId: string, sectionTitle: string, content: string | any[] | null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to perform this action",
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
        console.error('Error updating sections:', error);
        toast({
          title: "Error",
          description: "Unable to update sections",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred",
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
                  title={userSkill.skills.titre}
                  selectedSections={userSkill.sections_selectionnees}
                  skillId={userSkill.skill_id}
                  onAdd={handleAddSkillSection}
                  isMastered={userSkill.est_maitrisee}
                />
                <SkillContent
                  skillId={userSkill.skill_id}
                  selectedSections={userSkill.sections_selectionnees}
                  summary={userSkill.skills.resume}
                  explanation={userSkill.skills.explication}
                  concreteAction={userSkill.skills.action_concrete}
                  examples={userSkill.skills.exemples}
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