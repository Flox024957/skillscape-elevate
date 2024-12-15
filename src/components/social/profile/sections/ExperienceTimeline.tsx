import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Expérience professionnelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="relative space-y-8"
        >
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="flex gap-4 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                {index !== experience.length - 1 && (
                  <div className="w-0.5 h-full bg-border group-hover:bg-primary/50 transition-colors" />
                )}
              </div>
              <div className="flex-1 -mt-0.5 pb-8">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground">
                  {exp.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  {exp.start_date} - {exp.end_date || "Présent"}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};