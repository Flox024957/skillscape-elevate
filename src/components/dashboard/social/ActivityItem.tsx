import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ActivityIcon } from "../../social/activity/ActivityIcon";
import { ActivityContent } from "../../social/activity/ActivityContent";

interface ActivityItemProps {
  activity: {
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
  };
  index: number;
}

export const ActivityItem = ({ activity, index }: ActivityItemProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 h-auto py-3 group hover:bg-accent/50"
        onClick={() => navigate(`/profile/${activity.profile.id}`)}
      >
        <Avatar className="h-10 w-10 border-2 border-border group-hover:border-primary transition-colors">
          <AvatarImage src={activity.profile.image_profile} />
          <AvatarFallback>
            {activity.profile.pseudo?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left">
          <p className="font-medium group-hover:text-primary transition-colors">
            {activity.profile.pseudo}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ActivityIcon type={activity.type} />
            <ActivityContent activity={activity} />
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.created_at), {
            addSuffix: true,
            locale: fr
          })}
        </span>
      </Button>
    </motion.div>
  );
};