import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const SkillsTab = () => {
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<string[]>([]);
  
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

  const handleAddSkill = async (skillId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add skills",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_skills')
      .insert([{ user_id: user.id, skill_id: skillId }]);

    if (error) {
      toast({
        title: "Error",
        description: "Could not add skill to dashboard",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Added to profile",
      });
      refetch();
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderSkillSection = (title: string, content: string | null) => {
    if (!content) return null;
    
    return (
      <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
        <h4 className="font-medium text-sm text-muted-foreground mb-1">{title}</h4>
        <p className="text-sm">{content}</p>
      </div>
    );
  };

  const renderExamples = (examples: any[] | null) => {
    if (!examples || examples.length === 0) return null;
    
    return (
      <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
        <h4 className="font-medium text-sm text-muted-foreground mb-2">Examples</h4>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <p key={index} className="text-sm pl-4 border-l-2 border-border">
              {String(example)}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {userSkills?.map((userSkill) => (
        <Collapsible
          key={userSkill.skill_id}
          open={openSections.includes(userSkill.skill_id)}
          onOpenChange={() => toggleSection(userSkill.skill_id)}
          className="bg-card rounded-lg border border-border overflow-hidden"
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
                  handleAddSkill(userSkill.skill_id);
                }}
                className="hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            {renderSkillSection("Summary", userSkill.skills.summary)}
            {renderSkillSection("Explanation", userSkill.skills.explanation)}
            {renderSkillSection("Concrete Action", userSkill.skills.concrete_action)}
            {renderExamples(userSkill.skills.examples)}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default SkillsTab;