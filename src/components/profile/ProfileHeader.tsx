import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Globe2 } from "lucide-react";
import { Profile } from "@/integrations/supabase/types/profiles";

interface ProfileHeaderProps {
  profile: Profile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <>
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-t-lg">
          {profile.banner_image && (
            <img
              src={profile.banner_image}
              alt="Banner"
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-background">
            <img
              src={profile.image_profile || "/placeholder.svg"}
              alt={profile.pseudo || "Profile"}
              className="object-cover"
            />
          </Avatar>
        </div>
      </div>

      <Card className="mt-20">
        <CardHeader>
          <h2 className="text-2xl font-bold">{profile.pseudo}</h2>
          <div className="space-y-2">
            {profile.current_job && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{profile.current_job}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe2 className="h-4 w-4" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {profile.description && (
            <p className="text-muted-foreground">{profile.description}</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};