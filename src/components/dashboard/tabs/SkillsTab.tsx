import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LearningSkillsList } from "./skills/LearningSkillsList";
import { MasteredSkillsList } from "./skills/MasteredSkillsList";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Book, Trophy } from "lucide-react";

interface SkillsTabProps {
  userId: string;
}

const SkillsTab = ({ userId }: SkillsTabProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: userSkills, refetch: refetchUserSkills } = useQuery({
    queryKey: ['userSkills', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          *,
          skill:skills (
            id,
            titre,
            resume
          )
        `)
        .eq('user_id', userId)
        .order('position');
      
      if (error) {
        console.error('User skills error:', error);
        return [];
      }
      
      return data;
    },
  });

  const { data: masteredSkills, refetch: refetchMastered } = useQuery({
    queryKey: ['masteredSkills', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_mastered_skills')
        .select(`
          *,
          skill:skills (
            id,
            titre,
            resume
          )
        `)
        .eq('user_id', userId)
        .order('mastered_at', { ascending: false });
      
      if (error) {
        console.error('Mastered skills error:', error);
        return [];
      }
      
      return data;
    },
  });

  const handleMasterSkill = async (skillId: string) => {
    const { error: deleteError } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', userId)
      .eq('skill_id', skillId);

    if (deleteError) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la compétence de la liste d'apprentissage",
        variant: "destructive",
      });
      return;
    }

    const { error: insertError } = await supabase
      .from('user_mastered_skills')
      .insert([{
        user_id: userId,
        skill_id: skillId,
      }]);

    if (insertError) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer la compétence comme maîtrisée",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Compétence marquée comme maîtrisée",
      });
      refetchMastered();
      refetchUserSkills();
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', userId)
      .eq('skill_id', skillId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la compétence",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Compétence supprimée",
      });
      refetchUserSkills();
    }
  };

  const handleReorderSkills = async (reorderedSkills: any[]) => {
    const updates = reorderedSkills.map((skill, index) => ({
      id: skill.id,
      position: index,
    }));

    const { error } = await supabase
      .from('user_skills')
      .upsert(updates);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de réorganiser les compétences",
        variant: "destructive",
      });
    } else {
      refetchUserSkills();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Tabs defaultValue="learning" className="w-full">
        <TabsList 
          className={cn(
            "w-full flex flex-col gap-2 mb-8",
            !isMobile && "grid grid-cols-2 gap-2"
          )}
        >
          <TabsTrigger 
            value="learning" 
            className={cn(
              "flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 py-3",
              isMobile && "w-full"
            )}
          >
            <Book className="w-4 h-4" />
            Compétences en cours d'apprentissage
          </TabsTrigger>
          <TabsTrigger 
            value="mastered" 
            className={cn(
              "flex items-center justify-center gap-2 data-[state=active]:bg-primary/10 py-3",
              isMobile && "w-full"
            )}
          >
            <Trophy className="w-4 h-4" />
            Compétences maîtrisées
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-6">
          <LearningSkillsList
            skills={userSkills || []}
            onMaster={handleMasterSkill}
            onRemove={handleRemoveSkill}
            onReorder={handleReorderSkills}
          />
        </TabsContent>

        <TabsContent value="mastered">
          <MasteredSkillsList
            masteredSkills={masteredSkills || []}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SkillsTab;