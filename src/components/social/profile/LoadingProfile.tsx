import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const LoadingProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Chargement du profil...</p>
      </motion.div>
    </div>
  );
};