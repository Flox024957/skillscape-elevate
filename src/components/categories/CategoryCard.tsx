import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CategoryImage } from "./CategoryImage";
import { CategoryContent } from "./CategoryContent";
import { toast } from "sonner";

interface Skill {
  id: string;
  titre: string;
  resume?: string;
}

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
  index: number;
  skills?: Skill[];
}

export const CategoryCard = ({ 
  id, 
  name, 
  description, 
  imageUrl, 
  imagePosition, 
  index,
  skills 
}: CategoryCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = () => {
    try {
      console.log('Navigating to category:', id);
      navigate(`/category/${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("Erreur lors de la navigation");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm",
        "border border-white/10 hover:border-primary/50 transition-all duration-500",
        "cursor-pointer hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transform-gpu",
        isMobile ? "h-[200px]" : "h-[280px]"
      )}
      onClick={handleClick}
    >
      <CategoryImage 
        id={id}
        imageUrl={imageUrl}
        imagePosition={imagePosition}
      />
      <CategoryContent 
        name={name}
        description={description}
        skillsCount={skills?.length || 0}
        isMobile={isMobile}
      />
      <div className="absolute inset-0 border border-primary/0 rounded-xl opacity-0 
                    group-hover:opacity-100 group-hover:border-primary/30 transition-all 
                    duration-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] pointer-events-none" />
    </motion.div>
  );
};