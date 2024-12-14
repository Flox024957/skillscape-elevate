import { motion } from "framer-motion";
import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CodeBlock } from "./CodeBlock";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { CodeSnippet } from "@/types/games";

const initialCode: CodeSnippet[] = [
  {
    id: '1',
    content: 'function calculateSum(a, b) {',
    order: 1
  },
  {
    id: '2',
    content: '  const result = a + b;',
    order: 2
  },
  {
    id: '3',
    content: '  return result;',
    order: 3
  },
  {
    id: '4',
    content: '}',
    order: 4
  }
];

export const CodeBuilderGame = () => {
  const [blocks, setBlocks] = useState(() => {
    return [...initialCode].sort(() => Math.random() - 0.5);
  });
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkOrder = () => {
    const isCorrect = blocks.every((block, index) => block.order === index + 1);
    setIsComplete(isCorrect);
    
    if (isCorrect) {
      toast({
        title: "Félicitations !",
        description: "Vous avez correctement assemblé le code !",
      });
    } else {
      toast({
        title: "Pas tout à fait...",
        description: "L'ordre n'est pas encore correct. Réessayez !",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Construisez la Fonction
        </h2>
        <p className="text-muted-foreground">
          Glissez et déposez les blocs de code pour reconstruire la fonction correctement.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map(block => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 bg-card p-4 rounded-lg shadow-lg"
          >
            {blocks.map((block) => (
              <CodeBlock key={block.id} id={block.id} content={block.content} />
            ))}
          </motion.div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-center">
        <Button
          onClick={checkOrder}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Vérifier l'ordre
        </Button>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 bg-green-500/20 rounded-lg"
        >
          <p className="text-green-600 font-semibold">
            Parfait ! Vous avez correctement assemblé le code !
          </p>
        </motion.div>
      )}
    </div>
  );
};