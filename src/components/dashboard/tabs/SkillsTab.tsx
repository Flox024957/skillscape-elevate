import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SkillsTab = () => {
  const { data: userSkills } = useQuery({
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userSkills?.map((userSkill) => (
        <div
          key={userSkill.skill_id}
          className="bg-card p-4 rounded-lg border border-border"
        >
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
      ))}
    </div>
  );
};

export default SkillsTab;