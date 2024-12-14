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
import { SaveStructureDialog } from "./SaveStructureDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Save, RotateCcw, Trophy } from "lucide-react";

export const GameArea = () => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [score, setScore] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
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
      
      // Calculate bonus points based on structure size and skill category
      const basePoints = 10;
      const sizeBonus = selectedSkills.length * 2;
      const categoryBonus = selectedSkills.some(
        s => s.categories?.id === skill.categories?.id
      ) ? 5 : 0;
      
      const totalPoints = basePoints + sizeBonus + categoryBonus;
      
      setScore(prev => prev + totalPoints);
      
      toast({
        title: `+${totalPoints} points !`,
        description: 
          categoryBonus > 0 
            ? "Bonus de catégorie appliqué !"
            : "Continuez à construire votre structure.",
      });
    }
  };

  const validateStructure = () => {
    const structureSize = selectedSkills.length;
    const uniqueCategories = new Set(selectedSkills.map(s => s.categories?.id)).size;
    
    const sizeBonus = structureSize * 5;
    const categoryBonus = uniqueCategories * 10;
    const completionBonus = structureSize >= 5 ? 50 : 0;
    
    const totalBonus = sizeBonus + categoryBonus + completionBonus;
    
    setScore(prev => prev + totalBonus);
    
    toast({
      title: "Structure validée !",
      description: `Félicitations ! Bonus total : +${totalBonus} points
        ${completionBonus ? "(Structure complète +50)" : ""}
        ${categoryBonus ? `(Diversité +${categoryBonus})` : ""}
        ${sizeBonus ? `(Taille +${sizeBonus})` : ""}`,
    });
    
    setShowSaveDialog(true);
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
              <Trophy className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-primary">{score}</span>
            </div>
          </div>
          
          <Progress 
            value={(selectedSkills.length / 10) * 100} 
            className="h-2"
          />
          
          <div className="grid gap-4">
            <SortableContext 
              items={availableSkills} 
              strategy={verticalListSortingStrategy}
            >
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
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(true)}
              disabled={selectedSkills.length === 0}
              className="hover:bg-primary/10"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button 
              onClick={validateStructure}
              className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90"
              disabled={selectedSkills.length === 0}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Valider la Structure
            </Button>
          </div>
        </div>
      </DndContext>

      <SaveStructureDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        skills={selectedSkills}
        score={score}
      />
    </div>
  );
};