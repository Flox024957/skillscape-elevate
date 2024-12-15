import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Briefcase, GraduationCap, Languages } from "lucide-react";

interface AboutSectionProps {
  profile: {
    description?: string | null;
    current_job?: string | null;
    dream_job?: string | null;
    location?: string | null;
    languages?: string[] | null;
    interests?: string[] | null;
  };
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          À propos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.description && (
          <p className="text-muted-foreground">{profile.description}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.location && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.current_job && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span>{profile.current_job}</span>
            </div>
          )}

          {profile.dream_job && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              <span>Objectif : {profile.dream_job}</span>
            </div>
          )}

          {profile.languages && profile.languages.length > 0 && (
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <Badge key={language} variant="secondary">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {profile.interests && profile.interests.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Centres d'intérêt</h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};