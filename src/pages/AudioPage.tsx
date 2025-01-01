import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CategoryList } from "@/components/dashboard/audio/categories/CategoryList";
import { PlaylistManager } from "@/components/dashboard/audio/playlist/PlaylistManager";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AudioPage = () => {
  const handleAddSkillToCurrentPlaylist = async (skillId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté pour ajouter à la playlist");
      return;
    }

    const { data: currentPlaylist } = await supabase
      .from('skill_playlists')
      .select()
      .eq('user_id', user.id)
      .eq('name', 'Lecture en cours')
      .single();

    if (currentPlaylist) {
      const updatedSkills = [...(currentPlaylist.skills || []), skillId];
      const { error } = await supabase
        .from('skill_playlists')
        .update({
          skills: updatedSkills,
          skill_order: [...(currentPlaylist.skill_order || []), updatedSkills.length - 1]
        })
        .eq('id', currentPlaylist.id);

      if (error) {
        toast.error("Erreur lors de l'ajout à la playlist");
        return;
      }
    } else {
      const { error } = await supabase
        .from('skill_playlists')
        .insert([{
          user_id: user.id,
          name: 'Lecture en cours',
          skills: [skillId],
          skill_order: [0]
        }]);

      if (error) {
        toast.error("Erreur lors de la création de la playlist");
        return;
      }
    }
  };

  const handleAddCategoryToCurrentPlaylist = async (skillIds: string[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté pour ajouter à la playlist");
      return;
    }

    const { data: currentPlaylist } = await supabase
      .from('skill_playlists')
      .select()
      .eq('user_id', user.id)
      .eq('name', 'Lecture en cours')
      .single();

    if (currentPlaylist) {
      const updatedSkills = [...(currentPlaylist.skills || []), ...skillIds];
      const { error } = await supabase
        .from('skill_playlists')
        .update({
          skills: updatedSkills,
          skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
        })
        .eq('id', currentPlaylist.id);

      if (error) {
        toast.error("Erreur lors de l'ajout à la playlist");
        return;
      }
    } else {
      const { error } = await supabase
        .from('skill_playlists')
        .insert([{
          user_id: user.id,
          name: 'Lecture en cours',
          skills: skillIds,
          skill_order: Array.from({ length: skillIds.length }, (_, i) => i)
        }]);

      if (error) {
        toast.error("Erreur lors de la création de la playlist");
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="container mx-auto p-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Lecteur Audio
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Bibliothèque</h2>
              <CategoryList
                onSkillSelect={handleAddSkillToCurrentPlaylist}
                onCategorySelect={handleAddCategoryToCurrentPlaylist}
              />
            </Card>

            <PlaylistManager />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPage;