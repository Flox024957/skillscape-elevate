import { CollapsibleContent } from "@/components/ui/collapsible";
import SkillSection from "./SkillSection";
import ExamplesSection from "./ExamplesSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SkillContentProps {
  skillId: string;
  selectedSections: string[] | null;
  summary: string | null;
  explanation: string | null;
  concreteAction: string | null;
  examples: any[] | null;
}

const SkillContent = ({
  skillId,
  selectedSections,
  summary,
  explanation,
  concreteAction,
  examples,
}: SkillContentProps) => {
  const { toast } = useToast();

  const handleAddToNotes = async (skillId: string, title: string, content: string | any[] | null) => {
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

    // Format the content based on its type
    const formattedContent = Array.isArray(content)
      ? `${title}:\n${content.map(item => `- ${item}`).join('\n')}`
      : `${title}:\n${content}`;

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: formattedContent,
        tags: ['skill', skillId]
      }]);

    if (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Note ajoutée avec succès",
    });
  };

  return (
    <CollapsibleContent>
      <div className="p-6 space-y-6">
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
      </div>
    </CollapsibleContent>
  );
};

export default SkillContent;