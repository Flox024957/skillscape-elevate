import { CreateEventDialog } from "@/components/social/events/CreateEventDialog";
import { EventsList } from "@/components/social/events/EventsList";

interface ProfileEventsProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfileEvents = ({ userId, isOwnProfile }: ProfileEventsProps) => {
  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <div className="flex justify-end">
          <CreateEventDialog userId={userId} />
        </div>
      )}
      <EventsList userId={userId} />
    </div>
  );
};