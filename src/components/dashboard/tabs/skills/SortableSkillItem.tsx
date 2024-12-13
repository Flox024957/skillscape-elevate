import { useSortable } from '@dnd-kit/sortable';
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
  } = useSortable({ id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="mb-4">
      <div className="flex items-center gap-2">
        <button {...listeners} className="cursor-grab hover:cursor-grabbing p-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SortableSkillItem;