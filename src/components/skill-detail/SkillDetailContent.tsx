import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { Skill, transformSkill } from "@/types/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type SkillDetailContentProps = {
  skill: Skill;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
};

export const SkillDetailContent = ({ 
  skill, 
  onNavigateBack,
  onAddToDashboard 
}: SkillDetailContentProps) => {
  const examples = Array.isArray(skill.exemples) ? skill.exemples : [];

  return (
    <div className="container max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <Button
            variant="ghost"
            onClick={onNavigateBack}
            className="w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {skill.titre}
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Résumé Section */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Résumé</h2>
            <p className="text-muted-foreground leading-relaxed">
              {skill.resume}
            </p>
          </Card>

          {/* Description Section */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {skill.description}
            </p>
          </Card>

          {/* Action Concrète Section */}
          <Card className="p-6 hover:shadow-lg transition-shadow bg-primary/5">
            <h2 className="text-2xl font-semibold mb-4">Action Concrète</h2>
            <p className="text-muted-foreground leading-relaxed">
              {skill.action_concrete}
            </p>
          </Card>

          {/* Examples Section */}
          {examples.length > 0 && (
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Exemples</h2>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="grid gap-4">
                  {examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <Badge variant="outline" className="shrink-0">
                        {index + 1}
                      </Badge>
                      <p className="text-muted-foreground">
                        {String(example)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
};