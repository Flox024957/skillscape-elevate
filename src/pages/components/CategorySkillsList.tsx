import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  titre: string;
  resume?: string;
}

interface CategorySkillsListProps {
  skills: Skill[];
  onSkillClick: (skillId: string) => void;
}

export const CategorySkillsList = ({ skills, onSkillClick }: CategorySkillsListProps) => {
  const isMobile = useIsMobile();

  const handleAddSkill = async (skillId: string, title: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .upsert({
          user_id: user.id,
          skill_id: skillId,
        });

      if (error) {
        console.error('Error adding skill:', error);
        toast.error("Impossible d'ajouter la compétence");
        return;
      }

      toast.success(`Compétence "${title}" ajoutée avec succès`);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className={cn(
      "grid gap-4",
      isMobile ? "grid-cols-1 px-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    )}>
      {skills?.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onSkillClick(skill.id)}
          className="group cursor-pointer"
        >
          <div className={cn(
            "glass-panel relative p-4 md:p-6 rounded-lg border border-border/50",
            "hover:border-primary/50 transition-all duration-300 h-full",
            "bg-background/20 backdrop-blur-sm",
            isMobile && "active:scale-[0.98] touch-pan-y"
          )}>
            <div className="flex justify-between items-start gap-3">
              <h3 className={cn(
                "font-semibold group-hover:text-primary transition-colors flex-1",
                isMobile ? "text-lg" : "text-xl"
              )}>
                {skill.titre}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSkill(skill.id, skill.titre);
                }}
                className={cn(
                  "group relative flex items-center justify-center rounded-full",
                  "bg-gradient-to-r from-primary/80 to-purple-600/80 p-[2px]",
                  "transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]",
                  isMobile ? "w-10 h-10" : "w-12 h-12"
                )}
              >
                <div className="absolute inset-[1px] rounded-full bg-background/90 group-hover:bg-background/70 transition-colors" />
                <PlusCircle className={cn(
                  "relative z-10 text-white group-hover:text-primary transition-colors",
                  isMobile ? "w-5 h-5" : "w-6 h-6"
                )} />
              </motion.button>
            </div>
            {skill.resume && (
              <p className={cn(
                "text-muted-foreground mt-2",
                isMobile ? "text-sm" : "text-base"
              )}>
                {skill.resume}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};