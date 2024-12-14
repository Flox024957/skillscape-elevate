import { motion } from "framer-motion";
import type { Skill } from "@/types/skills";
import { Card } from "@/components/ui/card";

interface ConstructionZoneProps {
  skills: Skill[];
}

export const ConstructionZone = ({ skills }: ConstructionZoneProps) => {
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
    <Card className="p-6 min-h-[400px] bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border-2 border-dashed border-primary/20 rounded-xl">
      {skills.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Glissez des compétences ici pour construire votre structure
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              variants={item}
              className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary/50">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-medium">{skill.titre}</h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.action_concrete}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Card>
  );
};