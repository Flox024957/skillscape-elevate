import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Skill {
  id: string;
  title: string;
  summary?: string;
  explanation?: string;
  examples?: any[];
  concrete_action?: string;
  category_id: string;
}

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: skill, isLoading, error } = useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      console.log('Fetching skill with ID:', id);
      
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching skill:', error);
        toast.error("La compétence n'a pas pu être chargée");
        throw error;
      }

      if (!data) {
        console.error('No skill found with ID:', id);
        toast.error("La compétence n'existe pas");
        throw new Error('Skill not found');
      }

      console.log('Skill data:', data);
      return data as Skill;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              La compétence que vous recherchez n'existe pas ou a été supprimée.
            </h1>
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <Button 
          onClick={() => navigate(`/category/${skill.category_id}`)} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la catégorie
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 to-pink-600">
            {skill.title}
          </h1>

          {skill.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Résumé</h2>
              <p className="text-muted-foreground">{skill.summary}</p>
            </div>
          )}

          {skill.explanation && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Explication</h2>
              <p className="text-muted-foreground">{skill.explanation}</p>
            </div>
          )}

          {skill.examples && skill.examples.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Exemples</h2>
              <ul className="list-disc list-inside space-y-2">
                {skill.examples.map((example, index) => (
                  <li key={index} className="text-muted-foreground">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skill.concrete_action && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Action Concrète</h2>
              <p className="text-muted-foreground">{skill.concrete_action}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillDetailPage;