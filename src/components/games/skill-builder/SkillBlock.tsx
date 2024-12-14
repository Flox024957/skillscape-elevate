import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Skill } from "@/types/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface SkillBlockProps {
  skill: Skill;
}

export const SkillBlock = ({ skill }: SkillBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      whileHover={{ scale: 1.02 }}
      animate={isDragging ? { scale: 1.05, zIndex: 50 } : { scale: 1, zIndex: 1 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className={`p-4 space-y-2 bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 ${isDragging ? 'border-primary' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-5 h-5 text-muted-foreground" />
            <h4 className="font-semibold text-lg">{skill.titre}</h4>
          </div>
          {skill.categories && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {skill.categories.name}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {skill.resume}
        </p>
        <div className="text-xs text-muted-foreground/80 italic">
          Glissez pour construire
        </div>
      </Card>
    </motion.div>
  );
};