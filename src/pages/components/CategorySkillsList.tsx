import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills?.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onSkillClick(skill.id)}
          className="group cursor-pointer"
        >
          <div className="glass-panel p-6 rounded-lg border border-border/50 
                       hover:border-primary/50 transition-all duration-300 h-full
                       bg-background/20 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold group-hover:text-primary 
                         transition-colors flex-1">
                {skill.titre}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSkill(skill.id, skill.titre);
                }}
                className="group relative flex items-center justify-center w-12 h-12 
                         rounded-full bg-gradient-to-r from-primary/80 to-purple-600/80 
                         p-[2px] transition-all duration-300 
                         hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
              >
                <div className="absolute inset-[1px] rounded-full bg-background/90 
                           group-hover:bg-background/70 transition-colors" />
                <PlusCircle className="w-6 h-6 text-white relative z-10 
                                  group-hover:text-primary transition-colors" />
              </motion.button>
            </div>
            {skill.resume && (
              <p className="text-muted-foreground">{skill.resume}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};