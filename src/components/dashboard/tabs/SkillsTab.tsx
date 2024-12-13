import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Json } from "@/integrations/supabase/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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

const SkillsTab = () => {
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const queryClient = useQueryClient();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: userSkills, refetch } = useQuery({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          skills (
            id,
            title,
            summary,
            explanation,
            concrete_action,
            examples
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSkills'] });
      toast({
        title: "Success",
        description: "Skill removed from dashboard",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Could not remove skill from dashboard",
        variant: "destructive",
      });
    },
  });

  const handleDeleteSkill = (skillId: string) => {
    deleteSkillMutation.mutate(skillId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = userSkills?.findIndex(item => item.skill_id === active.id);
      const newIndex = userSkills?.findIndex(item => item.skill_id === over.id);
      
      if (oldIndex !== undefined && newIndex !== undefined) {
        const newOrder = arrayMove(userSkills, oldIndex, newIndex);
        queryClient.setQueryData(['userSkills'], newOrder);
      }
    }
  };

  const handleAddSkillSection = async (skillId: string, sectionTitle: string, content: string | Json[] | null) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add skills",
        variant: "destructive",
      });
      return;
    }

    if (!content) return;

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: `${sectionTitle} - ${Array.isArray(content) ? content.join('\n') : content}`,
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Could not add section to dashboard",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Added ${sectionTitle.toLowerCase()} to dashboard`,
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

  const renderSkillSection = (skillId: string, title: string, content: string | null) => {
    if (!content) return null;
    
    return (
      <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-sm text-muted-foreground mb-1">{title}</h4>
            <p className="text-sm">{content}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleAddSkillSection(skillId, title, content)}
            className="hover:bg-accent ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderExamples = (skillId: string, examples: Json[] | null) => {
    if (!examples || examples.length === 0) return null;
    
    return (
      <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Examples</h4>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <p key={index} className="text-sm pl-4 border-l-2 border-border">
                  {String(example)}
                </p>
              ))}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleAddSkillSection(skillId, "Examples", examples)}
            className="hover:bg-accent ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <SortableContext
          items={userSkills?.map(skill => skill.skill_id) || []}
          strategy={verticalListSortingStrategy}
        >
          {userSkills?.map((userSkill) => (
            <SortableSkillItem key={userSkill.skill_id} id={userSkill.skill_id}>
              <Collapsible
                open={openSections.includes(userSkill.skill_id)}
                onOpenChange={() => toggleSection(userSkill.skill_id)}
                className="bg-card rounded-lg border border-border overflow-hidden flex-1"
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-accent/50">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {userSkill.skills.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {userSkill.skills.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSkill(userSkill.skill_id);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 pt-0 space-y-4">
                  {renderSkillSection(userSkill.skill_id, "Summary", userSkill.skills.summary)}
                  {renderSkillSection(userSkill.skill_id, "Explanation", userSkill.skills.explanation)}
                  {renderSkillSection(userSkill.skill_id, "Concrete Action", userSkill.skills.concrete_action)}
                  {renderExamples(userSkill.skill_id, userSkill.skills.examples as Json[])}
                </CollapsibleContent>
              </Collapsible>
            </SortableSkillItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SkillsTab;