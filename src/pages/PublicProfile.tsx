import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FriendsList } from "@/components/social/FriendsList";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileExperienceEducation } from "@/components/profile/ProfileExperienceEducation";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { NewsFeed } from "@/components/social/NewsFeed";
import { CreatePost } from "@/components/social/CreatePost";
import { FriendshipButton } from "@/components/profile/FriendshipButton";
import { UserMediaGallery } from "@/components/profile/UserMediaGallery";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function PublicProfile() {
  const { userId } = useParams();
  const { data: profile, isLoading } = useProfileData(userId as string);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
      }
    };
    getCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-muted rounded-lg"></div>
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Profil non trouvé</h1>
          <p className="text-muted-foreground">
            Le profil que vous recherchez n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser === userId;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <ProfileHeader profile={profile} />
        {!isOwnProfile && currentUser && (
          <FriendshipButton currentUserId={currentUser} targetUserId={userId as string} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {isOwnProfile && (
            <CreatePost userId={userId as string} />
          )}
          <NewsFeed userId={userId as string} profileFeed={true} />
        </div>

        <div className="space-y-6">
          <ProfileSidebar profile={profile} />
          
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Médias partagés</h3>
            </CardHeader>
            <CardContent>
              <UserMediaGallery userId={userId as string} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Amis</h3>
            </CardHeader>
            <CardContent>
              <FriendsList userId={profile.id} variant="compact" />
            </CardContent>
          </Card>

          <ProfileExperienceEducation profile={profile} />
        </div>
      </div>
    </div>
  );
}