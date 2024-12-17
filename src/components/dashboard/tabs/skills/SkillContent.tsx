import { CollapsibleContent } from "@/components/ui/collapsible";
import SkillSection from "./SkillSection";
import ExamplesSection from "./ExamplesSection";
import { Json } from "@/integrations/supabase/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SkillContentProps {
  skillId: string;
  selectedSections: string[] | null;
  summary: string | null;
  explanation: string | null;
  concreteAction: string | null;
  examples: Json[] | null;
}

const SkillContent = ({
  skillId,
  selectedSections,
  summary,
  explanation,
  concreteAction,
  examples,
}: SkillContentProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleAddToNotes = async (skillId: string, title: string, content: string | Json[] | null) => {
    if (!content) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour ajouter des notes",
        variant: "destructive",
      });
      return;
    }

    const noteContent = Array.isArray(content) 
      ? `Exemples:\n${content.map(ex => `- ${ex}`).join('\n')}`
      : content;

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: `${title}:\n${noteContent}`,
        tags: ['skill', skillId]
      }]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Contenu ajouté à vos notes",
    });
  };

  return (
    <CollapsibleContent>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-6 space-y-6 ${isMobile ? 'text-sm' : ''}`}
      >
        {(!selectedSections || selectedSections.includes('Summary')) && (
          <SkillSection
            skillId={skillId}
            title="Résumé"
            content={summary}
            onAdd={handleAddToNotes}
          />
        )}
        {(!selectedSections || selectedSections.includes('Explanation')) && (
          <SkillSection
            skillId={skillId}
            title="Explication"
            content={explanation}
            onAdd={handleAddToNotes}
          />
        )}
        {(!selectedSections || selectedSections.includes('Concrete Action')) && (
          <SkillSection
            skillId={skillId}
            title="Action Concrète"
            content={concreteAction}
            onAdd={handleAddToNotes}
          />
        )}
        {(!selectedSections || selectedSections.includes('Examples')) && (
          <ExamplesSection
            skillId={skillId}
            examples={examples}
            onAdd={handleAddToNotes}
          />
        )}
      </motion.div>
    </CollapsibleContent>
  );
};

export default SkillContent;