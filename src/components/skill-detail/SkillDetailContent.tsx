import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "@/integrations/supabase/types";
import { ArrowLeft } from "lucide-react";

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
  const exemples = Array.isArray(skill.exemples) ? skill.exemples : [];

  return (
    <div className="container max-w-4xl px-4 py-8">
      <Button
        variant="ghost"
        onClick={onNavigateBack}
        className="mb-6 hover:bg-secondary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à {skill.categories?.name || 'la liste'}
      </Button>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{skill.titre}</h1>
          {skill.categories?.name && (
            <div className="text-muted-foreground">
              Catégorie: {skill.categories.name}
            </div>
          )}
        </div>

        {skill.resume && (
          <Alert>
            <AlertDescription className="text-lg">
              {skill.resume}
            </AlertDescription>
          </Alert>
        )}

        {skill.explication && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Explication</h2>
            <p className="text-muted-foreground leading-relaxed">
              {skill.explication}
            </p>
          </section>
        )}

        {skill.action_concrete && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Action Concrète</h2>
            <p className="text-muted-foreground leading-relaxed">
              {skill.action_concrete}
            </p>
          </section>
        )}

        {exemples.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Exemples</h2>
            <div className="space-y-3">
              {exemples.map((exemple, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {String(exemple)}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};