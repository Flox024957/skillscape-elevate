import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skill } from "@/types/skills";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SkillBlock } from "./SkillBlock";
import { ConstructionZone } from "./ConstructionZone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export const GameArea = () => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const { data: availableSkills = [], isLoading } = useQuery({
    queryKey: ["skills-for-game"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select(`
          id,
          titre,
          resume,
          description,
          action_concrete,
          exemples,
          category_id,
          created_at,
          updated_at,
          categories (
            id,
            name
          )
        `)
        .limit(10);

      if (error) throw error;
      return data as unknown as Skill[];
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const skill = availableSkills.find(s => s.id === active.id);
    if (skill && !selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setScore(prev => prev + 10);
      toast({
        title: "Compétence ajoutée !",
        description: "+10 points ! Continuez à construire votre structure.",
      });
    }
  };

  const validateStructure = () => {
    const bonus = selectedSkills.length * 5;
    setScore(prev => prev + bonus);
    toast({
      title: "Structure validée !",
      description: `Félicitations ! Vous avez gagné ${bonus} points bonus pour avoir construit une structure avec ${selectedSkills.length} compétences.`,
    });
  };

  const resetGame = () => {
    setSelectedSkills([]);
    setScore(0);
    toast({
      title: "Jeu réinitialisé",
      description: "Commencez une nouvelle structure !",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Compétences Disponibles</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">Score: {score}</span>
            </div>
          </div>
          
          <Progress value={(selectedSkills.length / 10) * 100} className="h-2" />
          
          <div className="grid gap-4">
            <SortableContext items={availableSkills} strategy={verticalListSortingStrategy}>
              {availableSkills.map((skill) => (
                <SkillBlock key={skill.id} skill={skill} />
              ))}
            </SortableContext>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Zone de Construction</h3>
          <ConstructionZone skills={selectedSkills} />
          
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={resetGame}
              className="hover:bg-destructive/10"
            >
              Réinitialiser
            </Button>
            <Button 
              onClick={validateStructure}
              className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90"
              disabled={selectedSkills.length === 0}
            >
              Valider la Structure
            </Button>
          </div>
        </div>
      </DndContext>
    </div>
  );
};