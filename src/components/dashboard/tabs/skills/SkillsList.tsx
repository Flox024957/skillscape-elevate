import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { UserSkill } from "@/types/skills";
import SortableSkillItem from "./SortableSkillItem";
import { Collapsible } from "@/components/ui/collapsible";
import SkillHeader from "./SkillHeader";
import SkillContent from "./SkillContent";

interface SkillsListProps {
  userSkills: UserSkill[];
  openSections: string[];
  toggleSection: (sectionId: string) => void;
  handleAddSkillSection: (skillId: string, sectionTitle: string, content: string | Json[] | null) => void;
}

const SkillsList = ({ 
  userSkills, 
  openSections, 
  toggleSection, 
  handleAddSkillSection 
}: SkillsListProps) => {
  return (
    <SortableContext
      items={userSkills.map(skill => skill.skill_id)}
      strategy={verticalListSortingStrategy}
    >
      {userSkills.map((userSkill) => (
        <SortableSkillItem key={userSkill.skill_id} id={userSkill.skill_id}>
          <Collapsible
            open={openSections.includes(userSkill.skill_id)}
            onOpenChange={() => toggleSection(userSkill.skill_id)}
            className="bg-card rounded-lg border border-border overflow-hidden flex-1"
          >
            <SkillHeader
              title={userSkill.skills.titre}
              selectedSections={userSkill.sections_selectionnees}
              skillId={userSkill.skill_id}
              onAdd={handleAddSkillSection}
              isMastered={userSkill.is_mastered}
            />
            <SkillContent
              skillId={userSkill.skill_id}
              selectedSections={userSkill.sections_selectionnees}
              summary={userSkill.skills.resume}
              explanation={userSkill.skills.description}
              concreteAction={userSkill.skills.action_concrete}
              examples={userSkill.skills.exemples}
              onAdd={handleAddSkillSection}
            />
          </Collapsible>
        </SortableSkillItem>
      ))}
    </SortableContext>
  );
};

export default SkillsList;