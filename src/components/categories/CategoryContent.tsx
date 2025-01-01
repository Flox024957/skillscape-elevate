import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skill } from "@/components/dashboard/audio/types";

interface CategoryContentProps {
  name: string;
  description: string;
  skillsCount: number;
  isMobile: boolean;
  skills?: Skill[];
  onSkillClick?: (skillId: string, event: React.MouseEvent) => void;
}

export const CategoryContent = ({ 
  name, 
  description, 
  skillsCount, 
  isMobile,
  skills,
  onSkillClick 
}: CategoryContentProps) => {
  return (
    <motion.div 
      className={cn(
        "absolute inset-0 p-3 flex flex-col justify-center items-center",
        "bg-gradient-to-t from-black/90 via-black/50 to-transparent",
        "text-white transition-all duration-300 group-hover:bg-black/70"
      )}
    >
      <motion.h3 
        className={cn(
          "font-medium bg-clip-text text-transparent text-center w-full",
          "bg-gradient-to-r from-white to-white/90",
          "group-hover:from-primary group-hover:to-purple-300",
          "transition-all duration-300",
          "break-words hyphens-auto leading-tight",
          isMobile ? "text-[15px]" : "text-sm",
          "max-w-[95%] mx-auto"
        )}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          WebkitLineClamp: 3,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}
      >
        {name}
      </motion.h3>

      {skills && skills.length > 0 && (
        <div className="mt-2 space-y-1">
          {skills.slice(0, 3).map((skill) => (
            <motion.button
              key={skill.id}
              onClick={(e) => onSkillClick?.(skill.id, e)}
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                "bg-white/10 hover:bg-primary/20",
                "transition-colors duration-200"
              )}
            >
              {skill.titre}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};