import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CreatePost } from "@/components/social/CreatePost";
import { NewsFeed } from "@/components/social/NewsFeed";

interface ProfilePostsTabProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfilePostsTab = ({ userId, isOwnProfile }: ProfilePostsTabProps) => {
  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="glass-panel border-primary/20">
            <CardContent className="pt-6">
              <CreatePost userId={userId} />
            </CardContent>
          </Card>
        </motion.div>
      )}
      <NewsFeed userId={userId} profileFeed={true} />
    </div>
  );
};