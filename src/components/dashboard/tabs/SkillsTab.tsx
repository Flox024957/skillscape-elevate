import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MasteredSkillsList } from "./skills/MasteredSkillsList";
import { SkillsList } from "./skills/SkillsList";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SkillsTabProps {
  userId: string;
}

const SkillsTab = ({ userId }: SkillsTabProps) => {
  const { toast } = useToast();

  const { data: skills, refetch: refetchSkills } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('titre');
      
      if (error) {
        console.error('Skills error:', error);
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
    const { error } = await supabase
      .from('user_mastered_skills')
      .insert([{
        user_id: userId,
        skill_id: skillId,
      }]);

    if (error) {
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
      refetchSkills();
    }
  };

  const handleRemoveMasteredSkill = async (skillId: string) => {
    const { error } = await supabase
      .from('user_mastered_skills')
      .delete()
      .eq('user_id', userId)
      .eq('skill_id', skillId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de retirer la compétence des maîtrises",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Compétence retirée des maîtrises",
      });
      refetchMastered();
      refetchSkills();
    }
  };

  const nonMasteredSkills = skills?.filter(
    skill => !masteredSkills?.some(ms => ms.skill_id === skill.id)
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary/10">
            Toutes les compétences
          </TabsTrigger>
          <TabsTrigger value="mastered" className="data-[state=active]:bg-primary/10">
            Compétences maîtrisées
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <SkillsList
            skills={nonMasteredSkills || []}
            onMaster={handleMasterSkill}
          />
        </TabsContent>

        <TabsContent value="mastered">
          {masteredSkills && masteredSkills.length > 0 ? (
            <MasteredSkillsList
              masteredSkills={masteredSkills}
              onRemove={handleRemoveMasteredSkill}
            />
          ) : (
            <div className="text-center p-8 bg-card/50 rounded-lg border border-border">
              <p className="text-muted-foreground">
                Aucune compétence maîtrisée pour le moment
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SkillsTab;