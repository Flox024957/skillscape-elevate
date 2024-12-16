import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Image, Users, Calendar, BookOpen } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ProfilePostsTab } from "./tabs/ProfilePostsTab";
import { ProfileMediaTab } from "./tabs/ProfileMediaTab";
import { ProfileFriendsTab } from "./tabs/ProfileFriendsTab";
import { ProfileEventsTab } from "./tabs/ProfileEventsTab";
import { ProfileExperienceTab } from "./tabs/ProfileExperienceTab";
import { Profile } from "@/integrations/supabase/types/profiles";

interface ProfileTabsProps {
  userId: string;
  isOwnProfile: boolean;
  profile: Profile;
}

export const ProfileTabs = ({ userId, isOwnProfile, profile }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start mb-6 glass-panel">
        <TabsTrigger value="posts" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Publications
        </TabsTrigger>
        <TabsTrigger value="media" className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          Médias
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Amis
        </TabsTrigger>
        <TabsTrigger value="events" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Événements
        </TabsTrigger>
        <TabsTrigger value="experience" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Expérience
        </TabsTrigger>
      </TabsList>

      <AnimatePresence mode="wait">
        <TabsContent value="posts">
          <ProfilePostsTab userId={userId} isOwnProfile={isOwnProfile} />
        </TabsContent>

        <TabsContent value="media">
          <ProfileMediaTab userId={userId} />
        </TabsContent>

        <TabsContent value="friends">
          <ProfileFriendsTab userId={userId} />
        </TabsContent>

        <TabsContent value="events">
          <ProfileEventsTab userId={userId} isOwnProfile={isOwnProfile} />
        </TabsContent>

        <TabsContent value="experience">
          <ProfileExperienceTab profile={profile} />
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
};