import { Button } from "@/components/ui/button";
import { SkillSection } from "./SkillSection";
import { ExamplesSection } from "./ExamplesSection";
import { Database } from "@/integrations/supabase/types";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

interface SkillDetailContentProps {
  skill: Skill;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
}

export const SkillDetailContent = ({ 
  skill, 
  onNavigateBack,
  onAddToDashboard 
}: SkillDetailContentProps) => {
  const examples = Array.isArray(skill.examples) ? skill.examples : [];

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={onNavigateBack}
            className="mb-4"
          >
            ← Retour à {skill.categories?.name}
          </Button>
          <h1 className="text-3xl font-bold">{skill.title}</h1>
        </div>
      </div>

      <div className="space-y-8">
        <SkillSection
          title="Résumé"
          content={skill.summary}
          type="Summary"
          onAdd={onAddToDashboard}
        />

        <SkillSection
          title="Explication"
          content={skill.explanation}
          type="Explanation"
          onAdd={onAddToDashboard}
        />

        <SkillSection
          title="Action Concrète"
          content={skill.concrete_action}
          type="Action"
          onAdd={onAddToDashboard}
        />

        {examples.length > 0 && (
          <ExamplesSection
            examples={examples}
            onAdd={onAddToDashboard}
          />
        )}
      </div>
    </div>
  );
};