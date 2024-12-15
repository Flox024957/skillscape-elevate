import { ActivityItem } from "./ActivityItem";
import { motion, AnimatePresence } from "framer-motion";

interface Activity {
  type: string;
  created_at: string;
  profile: {
    id: string;
    pseudo: string;
    image_profile: string;
  };
  postContent?: string;
  content?: string;
  status?: string;
}

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <ActivityItem 
            key={activity.created_at + index}
            activity={activity}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};