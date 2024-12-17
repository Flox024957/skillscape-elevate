import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CategoriesTitle } from "./CategoriesTitle";
import { CategoriesContent } from "./CategoriesContent";

export const CategoriesSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="px-4"
    >
      <CategoriesTitle />
      <CategoriesContent />
    </motion.div>
  );
};