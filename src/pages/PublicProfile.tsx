import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FriendsList } from "@/components/social/FriendsList";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileExperienceEducation } from "@/components/profile/ProfileExperienceEducation";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

export default function PublicProfile() {
  const { userId } = useParams();
  const { data: profile, isLoading } = useProfileData(userId as string);

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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ProfileHeader profile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileSidebar profile={profile} />
        <ProfileExperienceEducation profile={profile} />
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Amis</h3>
            </CardHeader>
            <CardContent>
              <FriendsList userId={profile.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}