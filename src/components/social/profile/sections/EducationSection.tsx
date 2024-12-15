import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Formation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="space-y-2 p-4 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <h3 className="font-medium text-lg">{edu.degree}</h3>
              <p className="text-primary">{edu.field}</p>
              <p className="text-sm text-muted-foreground">{edu.school}</p>
              <p className="text-sm text-muted-foreground">
                {edu.start_date} - {edu.end_date || "En cours"}
              </p>
              {edu.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};