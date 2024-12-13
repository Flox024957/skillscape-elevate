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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group cursor-pointer relative min-h-[200px] w-full overflow-hidden rounded-2xl bg-black/10 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500"
      onClick={handleClick}
    >
      <motion.div
        className={`absolute inset-0 bg-[url('${imageUrl}')] bg-cover ${imagePosition} transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1`}
        whileHover={{ scale: 1.05 }}
        id={`category-${id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-all duration-300">
          {name}
        </h3>
        <p className="text-white/80 text-sm line-clamp-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
};