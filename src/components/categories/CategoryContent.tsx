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
        "absolute inset-0 p-4 flex flex-col justify-center items-center",
        "bg-gradient-to-t from-black/90 via-black/50 to-transparent",
        "text-white transition-all duration-300 group-hover:bg-black/70"
      )}
    >
      <motion.h3 
        className={cn(
          "font-bold bg-clip-text text-transparent text-center w-full",
          "bg-gradient-to-r from-white to-white/90",
          "group-hover:from-primary group-hover:to-purple-300",
          "transition-all duration-300 px-2",
          "break-words hyphens-auto",
          isMobile ? "text-[11px] leading-tight" : "text-sm leading-snug",
          "max-w-[90%] mx-auto"
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
    </motion.div>
  );
};