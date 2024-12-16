import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserSkills } from "@/components/social/UserSkills";
import { FriendsList } from "@/components/social/FriendsList";
import { Briefcase, MapPin, Globe2 } from "lucide-react";

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
      {/* Banner and Profile Info */}
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

      {/* Profile Content */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="space-y-6">
          <Card>
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

          <UserSkills userId={profile.id} />
        </div>

        {/* Middle Column - Experience & Education */}
        <Card className="h-fit">
          <CardHeader>
            <h3 className="font-semibold">Expérience & Formation</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Experience Section */}
            <div className="space-y-4">
              <h4 className="font-medium">Expérience</h4>
              {profile.experience?.map((exp: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-medium">{exp.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {exp.start_date} - {exp.end_date || "Présent"}
                  </p>
                  {exp.description && (
                    <p className="text-sm">{exp.description}</p>
                  )}
                  {index < (profile.experience?.length || 0) - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <h4 className="font-medium">Formation</h4>
              {profile.education?.map((edu: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-medium">{edu.school}</h5>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} - {edu.field}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.start_date} - {edu.end_date || "Présent"}
                  </p>
                  {edu.description && (
                    <p className="text-sm">{edu.description}</p>
                  )}
                  {index < (profile.education?.length || 0) - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Friends */}
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