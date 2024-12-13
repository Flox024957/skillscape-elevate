import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SkillsTab = () => {
  const { toast } = useToast();
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
        description: "Skill added to dashboard",
      });
      refetch();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userSkills?.map((userSkill) => (
        <div
          key={userSkill.skill_id}
          className="bg-card p-4 rounded-lg border border-border"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {userSkill.skills.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {userSkill.skills.summary}
              </p>
              <div className="text-sm">
                Action: {userSkill.skills.concrete_action}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleAddSkill(userSkill.skill_id)}
              className="hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsTab;