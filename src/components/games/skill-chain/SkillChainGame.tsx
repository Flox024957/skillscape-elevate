import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Link, Sparkles } from "lucide-react";
import type { Skill } from "@/types/skills";

interface SkillChainGameProps {
  skills: Skill[];
  chain: Skill[];
  score: number;
  timeLeft: number;
  combo: number;
  handleAddSkill: (skill: Skill) => void;
}

export const SkillChainGame = ({
  skills,
  chain,
  score,
  timeLeft,
  combo,
  handleAddSkill,
}: SkillChainGameProps) => {
  const availableSkills = skills.filter(
    (skill) => !chain.find((s) => s.id === skill.id)
  );

  const timeProgress = (timeLeft / 180) * 100;
  const timeColor = timeProgress > 66 
    ? "bg-green-500" 
    : timeProgress > 33 
    ? "bg-yellow-500" 
    : "bg-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-2xl font-semibold">
              Score : {score}
            </div>
            {combo > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-sm font-medium text-yellow-500"
              >
                <Sparkles className="w-4 h-4" />
                Combo x{combo}
              </motion.div>
            )}
          </div>
          <div className="w-64 space-y-1">
            <Progress value={timeProgress} className={timeColor} />
            <div className="text-sm text-muted-foreground text-right">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Votre chaîne</h2>
            <div className="flex flex-wrap gap-4">
              {chain.map((skill, index) => (
                <div key={skill.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-500/10 p-4 rounded-xl"
                  >
                    <h3 className="font-medium">{skill.titre}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.categories?.name}
                    </p>
                  </motion.div>
                  {index < chain.length - 1 && (
                    <Link className="mx-2 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSkills.map((skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleAddSkill(skill)}
                >
                  <h3 className="font-medium">{skill.titre}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {skill.resume}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {skill.categories?.name}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};