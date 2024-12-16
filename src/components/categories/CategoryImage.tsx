import { motion } from "framer-motion";

interface CategoryImageProps {
  id: string;
  imageUrl: string;
  imagePosition: string;
}

export const CategoryImage = ({ id, imageUrl, imagePosition }: CategoryImageProps) => {
  return (
    <>
      <motion.div
        className={`absolute inset-0 bg-[url('${imageUrl}')] bg-cover ${imagePosition} 
                    transition-all duration-700 ease-out group-hover:scale-110 
                    group-hover:rotate-1 group-hover:opacity-90`}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 1 }}
        id={`category-${id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/50 
                    opacity-0 group-hover:opacity-100 transition-all duration-500 
                    mix-blend-overlay" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 
                    transition-all duration-500" />
    </>
  );
};