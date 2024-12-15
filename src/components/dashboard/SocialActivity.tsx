import { ActivityHeader } from "./social/ActivityHeader";
import { ActivityList } from "./social/ActivityList";
import { EmptyActivity } from "./social/EmptyActivity";
import { ActivityQueryProvider } from "./social/ActivityQueryProvider";

interface SocialActivityProps {
  userId: string;
}

export const SocialActivity = ({ userId }: SocialActivityProps) => {
  return (
    <ActivityQueryProvider userId={userId}>
      {({ activities, isLoading }) => {
        if (isLoading) {
          return (
            <div className="space-y-4 animate-pulse">
              <div className="h-16 bg-accent/20 rounded-lg"></div>
              <div className="h-16 bg-accent/20 rounded-lg"></div>
              <div className="h-16 bg-accent/20 rounded-lg"></div>
            </div>
          );
        }

        if (!activities?.length) {
          return <EmptyActivity />;
        }

        return (
          <div className="space-y-4">
            <ActivityHeader />
            <ActivityList activities={activities} />
          </div>
        );
      }}
    </ActivityQueryProvider>
  );
};