import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryContentProps {
  name: string;
  description: string;
  skillsCount: number;
  isMobile: boolean;
}

export const CategoryContent = ({ name, description, skillsCount, isMobile }: CategoryContentProps) => {
  return (
    <div className={`absolute inset-0 p-6 flex flex-col justify-end 
                    bg-gradient-to-t from-black/80 via-black/50 to-transparent
                    text-white transition-opacity duration-300
                    ${isMobile ? 'gap-1' : 'gap-2'}`}>
      <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>
        {name}
      </h3>
      <p className={`text-white/80 line-clamp-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm text-white/60">
        <span>{skillsCount} skills</span>
      </div>
    </div>
  );
};