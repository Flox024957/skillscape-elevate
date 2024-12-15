import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface Education {
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Formation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium">{edu.degree}</h3>
            <p className="text-sm text-muted-foreground">{edu.school}</p>
            <p className="text-sm text-muted-foreground">
              {edu.start_date} - {edu.end_date || "En cours"}
            </p>
            {edu.description && (
              <p className="text-sm text-muted-foreground">{edu.description}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};