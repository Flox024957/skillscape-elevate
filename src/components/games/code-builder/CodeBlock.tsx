import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  id: string;
  content: string;
}

export const CodeBlock = ({ id, content }: CodeBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
      className={cn(
        "p-4 bg-background border-2 rounded-lg cursor-move select-none",
        "hover:border-primary/50 transition-colors duration-200",
        isDragging ? "border-primary shadow-lg" : "border-border",
      )}
    >
      <pre className="font-mono text-sm">
        {content}
      </pre>
    </motion.div>
  );
};