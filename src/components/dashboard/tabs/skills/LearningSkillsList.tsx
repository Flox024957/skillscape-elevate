import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from "framer-motion";
import SortableSkillItem from './SortableSkillItem';
import { Trophy, Trash2, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SkillContent from "@/components/dashboard/tabs/skills/SkillContent";
import { useState } from "react";

interface Skill {
  id: string;
  skill_id: string;
  skill: {
    id: string;
    titre: string;
    resume: string;
    description: string;
    action_concrete: string;
    exemples: any[];
  };
  sections_selectionnees: string[] | null;
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
  const [openSkillId, setOpenSkillId] = useState<string | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 8,
    },
  });
  
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = useSensors(
    pointerSensor,
    touchSensor,
    keyboardSensor
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
                <Collapsible
                  open={openSkillId === skill.id}
                  onOpenChange={() => setOpenSkillId(openSkillId === skill.id ? null : skill.id)}
                  className="w-full"
                >
                  <div className="flex items-center justify-between w-full bg-card hover:bg-card/80 p-4 rounded-t-lg border border-border group">
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
                    <div className="flex items-center gap-2">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
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
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              openSkillId === skill.id ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openSkillId === skill.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CollapsibleContent>
                          <div className="border-x border-b border-border rounded-b-lg bg-card/50">
                            <SkillContent
                              skillId={skill.skill.id}
                              selectedSections={skill.sections_selectionnees}
                              summary={skill.skill.resume}
                              explanation={skill.skill.description}
                              concreteAction={skill.skill.action_concrete}
                              examples={skill.skill.exemples}
                              onAdd={() => {}} // We don't need this functionality here
                            />
                          </div>
                        </CollapsibleContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Collapsible>
              </SortableSkillItem>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};
