import { motion } from "framer-motion";
import { Skill } from "@/types/skills";
import { SkillHeader } from "./SkillHeader";
import { SkillContent } from "./SkillContent";
import { getSkillIllustration } from "@/utils/skillIllustrations";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const examples = Array.isArray(skill.exemples) ? skill.exemples : [];
  const illustrationUrl = getSkillIllustration(skill.category_id);
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "container max-w-6xl relative overflow-hidden",
      isMobile ? "px-4 py-4" : "px-4 py-8"
    )}>
      {/* Background Illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${illustrationUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          zIndex: -1
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "space-y-8 relative",
          isMobile && "pb-20"
        )}
      >
        <SkillHeader 
          title={skill.titre}
          onNavigateBack={onNavigateBack}
          onAddToDashboard={onAddToDashboard}
        />
        
        <SkillContent 
          resume={skill.resume}
          description={skill.description}
          actionConcrete={skill.action_concrete}
          examples={examples}
        />
      </motion.div>
    </div>
  );
};