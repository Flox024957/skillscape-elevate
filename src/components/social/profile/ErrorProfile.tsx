import { motion } from "framer-motion";

interface ErrorProfileProps {
  userId: string;
}

export const ErrorProfile = ({ userId }: ErrorProfileProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold text-destructive">Profil introuvable</h2>
        <p className="text-muted-foreground">
          Le profil que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <p className="text-sm text-muted-foreground">
          ID utilisateur: {userId}
        </p>
      </motion.div>
    </div>
  );
};