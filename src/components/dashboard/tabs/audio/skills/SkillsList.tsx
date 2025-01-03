import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skill } from "@/types/skill";
import { motion } from "framer-motion";

interface SkillsListProps {
  skills: Skill[];
}

const SkillContent = ({ skill }: { skill: Skill }) => {
  return (
    <CollapsibleContent className="mt-4 space-y-4">
      {skill.resume && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Résumé</h5>
          <p className="text-sm text-muted-foreground">{skill.resume}</p>
        </div>
      )}
      
      {skill.description && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Description</h5>
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        </div>
      )}
      
      {skill.action_concrete && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Action Concrète</h5>
          <p className="text-sm text-muted-foreground">{skill.action_concrete}</p>
        </div>
      )}
      
      {skill.exemples && skill.exemples.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Exemples</h5>
          <ul className="list-disc list-inside space-y-1">
            {skill.exemples.map((exemple, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {String(exemple)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </CollapsibleContent>
  );
};

export const SkillsList = ({ skills }: SkillsListProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: playlists } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const handleAddToPlaylist = async (playlistId: string) => {
    if (!selectedSkill) return;

    const playlist = playlists?.find(p => p.id === playlistId);
    if (!playlist) return;

    const updatedSkills = [...(playlist.skills || []), selectedSkill.id];
    const { error } = await supabase
      .from('skill_playlists')
      .update({ 
        skills: updatedSkills,
        skill_order: [...(playlist.skill_order || []), updatedSkills.length - 1]
      })
      .eq('id', playlistId);

    if (error) {
      toast.error("Erreur lors de l'ajout à la playlist");
      return;
    }

    toast.success(`${selectedSkill.titre} ajouté à la playlist`);
    setIsDialogOpen(false);
    setSelectedSkill(null);
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Collapsible>
            <div className="flex items-start justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border group">
              <div className="flex-1">
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  <div>
                    <h4 className="text-base font-medium group-hover:text-primary transition-colors">
                      {skill.titre}
                    </h4>
                    {skill.categories?.name && (
                      <span className="text-sm text-muted-foreground">
                        {skill.categories.name}
                      </span>
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <SkillContent skill={skill} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedSkill(skill);
                  setIsDialogOpen(true);
                }}
                className="hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Collapsible>
        </motion.div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter à une playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {playlists?.map((playlist) => (
              <Button
                key={playlist.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddToPlaylist(playlist.id)}
              >
                {playlist.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};