import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

interface ExperienceTimelineProps {
  experience: Experience[];
}

export const ExperienceTimeline = ({ experience }: ExperienceTimelineProps) => {
  if (!experience?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Expérience professionnelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8">
          {experience.map((exp, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full" />
                {index !== experience.length - 1 && (
                  <div className="w-0.5 h-full bg-border" />
                )}
              </div>
              <div className="flex-1 -mt-0.5 pb-8">
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.start_date} - {exp.end_date || "Présent"}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};