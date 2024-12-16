import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from "framer-motion";
import SortableSkillItem from './SortableSkillItem';
import { Trophy, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skill {
  id: string;
  skill_id: string;
  skill: {
    id: string;
    titre: string;
    resume: string;
  };
}

interface LearningSkillsListProps {
  skills: Skill[];
  onMaster: (skillId: string) => void;
  onRemove: (skillId: string) => void;
  onReorder: (reorderedSkills: Skill[]) => void;
}

export const LearningSkillsList = ({ 
  skills, 
  onMaster, 
  onRemove,
  onReorder 
}: LearningSkillsListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = skills.findIndex(skill => skill.id === active.id);
      const newIndex = skills.findIndex(skill => skill.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSkills = [...skills];
        const [movedSkill] = newSkills.splice(oldIndex, 1);
        newSkills.splice(newIndex, 0, movedSkill);
        onReorder(newSkills);
      }
    }
  };

  if (!Array.isArray(skills)) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!skills.length) {
    return (
      <div className="text-center p-8 bg-card/50 rounded-lg border border-border">
        <p className="text-muted-foreground">
          Aucune compétence en cours d'apprentissage
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={skills.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {skills.map((skill, index) => {
            if (!skill?.skill) {
              console.warn('Invalid skill data:', skill);
              return null;
            }

            return (
              <SortableSkillItem key={skill.id} id={skill.id}>
                <div className="flex items-center justify-between w-full bg-card hover:bg-card/80 p-4 rounded-lg border border-border group">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}.
                    </span>
                    <div>
                      <h4 className="text-base font-medium group-hover:text-primary transition-colors">
                        {skill.skill.titre}
                      </h4>
                      {skill.skill.resume && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {skill.skill.resume}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMaster(skill.skill_id)}
                      className="hover:bg-green-500/10 hover:text-green-500"
                    >
                      <Trophy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(skill.skill_id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SortableSkillItem>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};