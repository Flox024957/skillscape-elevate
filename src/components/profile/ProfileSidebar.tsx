import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, Heart, Calendar, Globe2 } from "lucide-react";
import { Profile } from "@/integrations/supabase/types/profiles";
import { UserSkills } from "@/components/social/UserSkills";

interface ProfileSidebarProps {
  profile: Profile;
}

export const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
  const languages = Array.isArray(profile.languages) ? profile.languages : [];
  const interests = Array.isArray(profile.interests) ? profile.interests : [];
  const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];
  const socialLinks = profile.social_links as Record<string, string> || {};

  return (
    <div className="space-y-6">
      {languages.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Langues
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <Badge key={index} variant="secondary">
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {interests.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Centres d'intérêt
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge key={index} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <UserSkills userId={profile.id} />

      {certifications.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Certifications
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certifications.map((cert: any, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} - {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(socialLinks).length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Réseaux Sociaux</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe2 className="h-4 w-4" />
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};