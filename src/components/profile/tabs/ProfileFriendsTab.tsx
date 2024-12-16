import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FriendsList } from "@/components/social/FriendsList";

interface ProfileFriendsTabProps {
  userId: string;
}

export const ProfileFriendsTab = ({ userId }: ProfileFriendsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold gradient-text">Réseau</h3>
        <Badge variant="secondary" className="bg-primary/10">
          Connexions
        </Badge>
      </div>
      <FriendsList userId={userId} variant="full" />
    </motion.div>
  );
};