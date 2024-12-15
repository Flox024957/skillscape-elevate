import { Badge } from "@/components/ui/badge";
import { Book, BookOpen } from "lucide-react";

interface SkillsSectionProps {
  masteredSkills: any[];
  userSkills: any[];
}

export const SkillsSection = ({ masteredSkills, userSkills }: SkillsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Book className="w-4 h-4" />
          Skills maîtrisés
        </h4>
        <div className="flex flex-wrap gap-2">
          {masteredSkills.map((skill) => (
            <Badge key={skill.skill_id} variant="default">
              {skill.skills.titre}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          En apprentissage
        </h4>
        <div className="flex flex-wrap gap-2">
          {userSkills.map((skill) => (
            <Badge 
              key={skill.skill_id} 
              variant="secondary"
              className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
            >
              {skill.skills.titre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};