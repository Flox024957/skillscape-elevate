import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: category } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category_id', id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const addToDashboard = async (skillId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-flap-black to-flap-black/95">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/main")}
              className="mb-4"
            >
              ← Back
            </Button>
            <h1 className="text-3xl font-bold text-flap-white">
              {category?.name}
            </h1>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="glass-panel hover:bg-flap-neon/20"
          >
            Dashboard
          </Button>
        </div>

        <div className="grid gap-6">
          {skills?.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 relative group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 
                    className="text-xl font-semibold mb-2 cursor-pointer hover:text-flap-neon"
                    onClick={() => navigate(`/skill/${skill.id}`)}
                  >
                    {skill.title}
                  </h3>
                  <p className="text-gray-400">{skill.summary}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => addToDashboard(skill.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;