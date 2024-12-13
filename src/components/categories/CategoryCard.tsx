import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imagePosition: string;
  index: number;
}

export const CategoryCard = ({ id, name, description, imageUrl, imagePosition, index }: CategoryCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = () => {
    const element = document.querySelector(`#category-${id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => navigate(`/category/${id}`), 500);
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
      <motion.div
        className={`absolute inset-0 bg-[url('${imageUrl}')] bg-cover ${imagePosition} 
                    transition-all duration-700 ease-out opacity-80 group-hover:opacity-100 
                    group-hover:scale-105`}
        whileHover={{ scale: 1.05 }}
        id={`category-${id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 
                      to-transparent opacity-90 group-hover:opacity-70 transition-all duration-500" />
      
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
      </div>

      <div className="absolute inset-0 border border-primary/0 rounded-xl opacity-0 
                      group-hover:opacity-100 group-hover:border-primary/30 transition-all 
                      duration-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] pointer-events-none" />
    </motion.div>
  );
};