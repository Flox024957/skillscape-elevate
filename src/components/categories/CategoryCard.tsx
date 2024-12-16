import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CategoryImage } from "./CategoryImage";
import { CategoryContent } from "./CategoryContent";
import { toast } from "sonner";

interface Skill {
  id: string;
  title: string;
  summary?: string;
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
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-black/5 via-black/10 to-black/20",
        "backdrop-blur-sm border border-white/10",
        "hover:border-primary/50 transition-all duration-500",
        "cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        "transform-gpu perspective-1000",
        isMobile ? "h-[120px]" : "h-[140px]"
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
    </motion.div>
  );
};