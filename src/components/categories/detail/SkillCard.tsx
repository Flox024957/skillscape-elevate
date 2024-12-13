import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SkillCardProps {
  id: string;
  title: string;
  summary: string | null;
  onSkillClick: (skillId: string) => void;
}

export const SkillCard = ({ id, title, summary, onSkillClick }: SkillCardProps) => {
  const handleAddSkill = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error: existingSkillError, data: existingSkill } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', user.id)
        .eq('skill_id', id)
        .single();

      if (existingSkill) {
        toast.info("Cette compétence est déjà dans votre tableau de bord");
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .insert([
          {
            user_id: user.id,
            skill_id: id,
          },
        ]);

      if (error) throw error;

      toast.success(`${title} a été ajouté à votre tableau de bord`);
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error("Une erreur est survenue lors de l'ajout de la compétence");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-card border border-border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-colors flex-1">
            {title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSkill}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
            <PlusCircle className="w-6 h-6 text-white relative z-10 group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
        <div onClick={() => onSkillClick(id)}>
          {summary && (
            <p className="text-muted-foreground line-clamp-2">
              {summary}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};