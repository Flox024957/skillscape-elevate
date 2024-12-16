import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryContentProps {
  name: string;
  description: string;
  skillsCount: number;
  isMobile: boolean;
}

export const CategoryContent = ({ name, description, skillsCount, isMobile }: CategoryContentProps) => {
  return (
    <motion.div 
      className={cn(
        "absolute inset-0 p-6 flex flex-col justify-end",
        "bg-gradient-to-t from-black/90 via-black/50 to-transparent",
        "text-white transition-all duration-300 group-hover:bg-black/70",
        isMobile ? "gap-1" : "gap-2"
      )}
    >
      <motion.h3 
        className={cn(
          "font-bold bg-clip-text text-transparent",
          "bg-gradient-to-r from-white to-white/90",
          "group-hover:from-primary group-hover:to-purple-300",
          "transition-all duration-300",
          isMobile ? "text-lg" : "text-xl"
        )}
      >
        {name}
      </motion.h3>
      <motion.p 
        className={cn(
          "text-white/80 line-clamp-2 group-hover:text-white/90",
          "transition-all duration-300",
          isMobile ? "text-sm" : "text-base"
        )}
      >
        {description}
      </motion.p>
      <motion.div 
        className={cn(
          "flex items-center gap-2 text-sm",
          "text-white/60 group-hover:text-primary/90",
          "transition-all duration-300"
        )}
      >
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary" />
          {skillsCount} skills
        </span>
      </motion.div>
    </motion.div>
  );
};