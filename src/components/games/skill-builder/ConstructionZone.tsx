import { motion } from "framer-motion";
import type { Skill } from "@/types/skills";
import { Card } from "@/components/ui/card";
import { Trophy, Layers, FolderTree } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const uniqueCategories = new Set(skills.map(s => s.categories?.name));

  return (
    <Card className="p-6 min-h-[400px] bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border-2 border-dashed border-primary/20 rounded-xl relative overflow-hidden">
      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Trophy className="w-16 h-16 text-primary/40" />
          </motion.div>
          <p className="text-center">
            Glissez des compétences ici pour construire votre structure
          </p>
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
              className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary/50 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-lg">{skill.titre}</h4>
                    {skill.categories && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {skill.categories.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {skill.action_concrete}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {skills.length} compétences
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <FolderTree className="w-4 h-4" />
              {uniqueCategories.size} catégories
            </Badge>
          </div>
        </motion.div>
      )}
    </Card>
  );
};