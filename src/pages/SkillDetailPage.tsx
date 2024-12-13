import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import { SkillSection } from "@/components/skill-detail/SkillSection";
import { ExamplesSection } from "@/components/skill-detail/ExamplesSection";
import { Toaster } from "@/components/ui/sonner";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: skill, isLoading, error } = useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Skill ID is required');
      }
      const { data, error } = await supabase
        .from('skills')
        .select('*, categories(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Skill;
    },
    enabled: !!id, // Only run the query if we have an ID
  });

  const addToDashboard = async (type: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in to add content to your dashboard");
      return;
    }

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: `${type}: ${content}`,
      }]);

    if (error) {
      toast.error("Could not add content to dashboard");
    } else {
      toast.success("Added to profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Error loading skill</h2>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const examples = Array.isArray(skill.examples) ? skill.examples : [];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(`/category/${skill.category_id}`)}
              className="mb-4"
            >
              ← Back to {skill.categories?.name}
            </Button>
            <h1 className="text-3xl font-bold">{skill.title}</h1>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </div>

        <div className="space-y-8">
          <SkillSection
            title="Summary"
            content={skill.summary}
            type="Summary"
            onAdd={addToDashboard}
          />

          <SkillSection
            title="Explanation"
            content={skill.explanation}
            type="Explanation"
            onAdd={addToDashboard}
          />

          <SkillSection
            title="Concrete Action"
            content={skill.concrete_action}
            type="Action"
            onAdd={addToDashboard}
          />

          <ExamplesSection
            examples={examples}
            onAdd={addToDashboard}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;