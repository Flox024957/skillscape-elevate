import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, Target } from "lucide-react";
import { Profile } from "@/integrations/supabase/types/profiles";

interface ProfileExperienceEducationProps {
  profile: Profile;
}

export const ProfileExperienceEducation = ({ profile }: ProfileExperienceEducationProps) => {
  const experience = Array.isArray(profile.experience) ? profile.experience : [];
  const education = Array.isArray(profile.education) ? profile.education : [];
  const personalGoals = Array.isArray(profile.personal_goals) ? profile.personal_goals : [];

  return (
    <Card className="h-fit">
      <CardHeader>
        <h3 className="font-semibold">Expérience & Formation</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Expérience
            </h4>
            {experience.map((exp, index) => (
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
                {index < experience.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Formation
            </h4>
            {education.map((edu, index) => (
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
                {index < education.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        )}

        {personalGoals.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Target className="h-5 w-5" />
              Objectifs Personnels
            </h4>
            <ul className="space-y-2">
              {personalGoals.map((goal, index) => (
                <li key={index} className="text-sm">
                  {typeof goal === 'string' ? goal : JSON.stringify(goal)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};