import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export const GameHeader = () => {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="p-3 bg-primary/20 rounded-xl backdrop-blur-sm"
      >
        <Brain className="w-8 h-8 text-primary" />
      </motion.div>
      <h2 className="text-2xl font-bold text-primary">
        Mémorisez et répondez rapidement !
      </h2>
    </div>
  );
};