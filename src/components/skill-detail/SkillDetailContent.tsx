import { Button } from "@/components/ui/button";
import { SkillSection } from "./SkillSection";
import { ExamplesSection } from "./ExamplesSection";
import { Database } from "@/integrations/supabase/types";
import { Skill, transformSkill } from "@/types/skills";

type SkillDetailContentProps = {
  skill: Skill;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
};

export const SkillDetailContent = ({ 
  skill, 
  onNavigateBack,
  onAddToDashboard 
}: SkillDetailContentProps) => {
  const transformedSkill = transformSkill(skill);
  const examples = Array.isArray(skill.exemples) ? skill.exemples : [];

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={onNavigateBack}
            className="mb-4"
          >
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold">{transformedSkill.title}</h1>
        </div>
      </div>

      <div className="space-y-8">
        <SkillSection
          title="Résumé"
          content={transformedSkill.summary}
          type="Summary"
          onAdd={onAddToDashboard}
        />

        <SkillSection
          title="Description"
          content={transformedSkill.description}
          type="Description"
          onAdd={onAddToDashboard}
        />

        <SkillSection
          title="Action Concrète"
          content={transformedSkill.concrete_action}
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