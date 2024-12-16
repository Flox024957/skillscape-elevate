import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProfileEvents } from "@/components/profile/ProfileEvents";

interface ProfileEventsTabProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfileEventsTab = ({ userId, isOwnProfile }: ProfileEventsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold gradient-text">Événements</h3>
        <Badge variant="secondary" className="bg-primary/10">
          Agenda
        </Badge>
      </div>
      <ProfileEvents userId={userId} isOwnProfile={isOwnProfile} />
    </motion.div>
  );
};