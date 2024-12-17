import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { UserSkill } from "@/types/skills";

interface SkillContentSectionProps {
  userSkill: UserSkill;
  onAddToCalendar: (skillId: string, content: string) => void;
}

export const SkillContentSection = ({ userSkill, onAddToCalendar }: SkillContentSectionProps) => {
  return (
    <div className="p-4 space-y-4">
      {userSkill.skills.resume && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Résumé</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToCalendar(userSkill.skills.id, userSkill.skills.resume || '')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter au calendrier
            </Button>
          </div>
          <p className="text-sm">{userSkill.skills.resume}</p>
        </div>
      )}

      {userSkill.skills.description && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Description</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToCalendar(userSkill.skills.id, userSkill.skills.description || '')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter au calendrier
            </Button>
          </div>
          <p className="text-sm">{userSkill.skills.description}</p>
        </div>
      )}

      {userSkill.skills.action_concrete && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Action concrète</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToCalendar(userSkill.skills.id, userSkill.skills.action_concrete || '')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter au calendrier
            </Button>
          </div>
          <p className="text-sm">{userSkill.skills.action_concrete}</p>
        </div>
      )}

      {userSkill.skills.exemples && userSkill.skills.exemples.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Exemples</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToCalendar(
                userSkill.skills.id,
                `Exemples:\n${userSkill.skills.exemples.map((ex: string) => `- ${ex}`).join('\n')}`
              )}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter au calendrier
            </Button>
          </div>
          <ul className="list-disc list-inside text-sm space-y-1">
            {userSkill.skills.exemples.map((exemple: string, index: number) => (
              <li key={index}>{exemple}</li>
            ))}
          </ul>
        </div>
      )}

      {userSkill.sections_selectionnees && userSkill.sections_selectionnees.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {userSkill.sections_selectionnees.map((section) => (
            <Badge key={section} variant="secondary">
              {section}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};