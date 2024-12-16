import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { UserMediaGallery } from "@/components/profile/UserMediaGallery";

interface ProfileMediaTabProps {
  userId: string;
}

export const ProfileMediaTab = ({ userId }: ProfileMediaTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold gradient-text">Galerie Média</h3>
        <Badge variant="secondary" className="bg-primary/10">
          Collection
        </Badge>
      </div>
      <UserMediaGallery userId={userId} />
    </motion.div>
  );
};