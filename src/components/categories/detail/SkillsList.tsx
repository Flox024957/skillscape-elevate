import { motion } from "framer-motion";
import { SkillCard } from "./SkillCard";
import { Skill } from "@/types/skills";

interface SkillsListProps {
  skills: Skill[];
  onSkillClick: (skillId: string) => void;
}

export const SkillsList = ({ skills, onSkillClick }: SkillsListProps) => {
  return (
    <div className="grid gap-6">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          id={skill.id}
          title={skill.titre}
          summary={skill.resume}
          onSkillClick={onSkillClick}
        />
      ))}
    </div>
  );
};