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
                    transition-all duration-700 ease-out opacity-80 group-hover:opacity-100 
                    group-hover:scale-105`}
        whileHover={{ scale: 1.05 }}
        id={`category-${id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 
                      to-transparent opacity-90 group-hover:opacity-70 transition-all duration-500" />
    </>
  );
};