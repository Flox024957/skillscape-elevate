import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
      className="group relative h-[280px] w-full overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm 
                 border border-white/10 hover:border-primary/50 transition-all duration-500 cursor-pointer
                 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transform-gpu"
      onClick={handleClick}
    >
      <motion.div
        className={`absolute inset-0 bg-[url('${imageUrl}')] bg-cover ${imagePosition} transition-all duration-700 
                    ease-out opacity-80 group-hover:opacity-100 group-hover:scale-105`}
        whileHover={{ scale: 1.05 }}
        id={`category-${id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                      opacity-90 group-hover:opacity-70 transition-all duration-500" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-2 
                      group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary 
                      transition-all duration-300 transform group-hover:scale-105">
          {name}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 transform translate-y-4 opacity-0 
                      group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>
      </div>

      {/* Neon border effect */}
      <div className="absolute inset-0 border border-primary/0 rounded-xl opacity-0 
                      group-hover:opacity-100 group-hover:border-primary/30 transition-all duration-500
                      shadow-[0_0_15px_rgba(139,92,246,0.3)] pointer-events-none" />
    </motion.div>
  );
};