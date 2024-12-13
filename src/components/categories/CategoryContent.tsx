import { cn } from "@/lib/utils";

interface CategoryContentProps {
  name: string;
  description: string;
  skillsCount: number;
  isMobile: boolean;
}

export const CategoryContent = ({ name, description, skillsCount, isMobile }: CategoryContentProps) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 transform 
                    translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
      <h3 className={cn(
        "font-bold mb-2 md:mb-3 text-white group-hover:text-primary",
        "transition-all duration-300 transform group-hover:scale-105",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {name}
      </h3>
      <p className={cn(
        "text-white/70 line-clamp-2 transform translate-y-4",
        "opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
        "transition-all duration-500",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {description}
      </p>
      <div className={cn(
        "mt-2 text-primary/80 transform translate-y-4",
        "opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
        "transition-all duration-500 delay-100",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {skillsCount} compétence{skillsCount > 1 ? 's' : ''}
      </div>
    </div>
  );
};