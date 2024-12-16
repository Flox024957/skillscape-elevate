import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from "lucide-react";

interface SortableSkillItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableSkillItem = ({ id, children }: SortableSkillItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
    touchAction: 'none'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="mb-4">
      <div className="flex items-center gap-2">
        <button 
          {...listeners} 
          className="touch-none cursor-grab active:cursor-grabbing p-2"
          aria-label="Réorganiser"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SortableSkillItem;