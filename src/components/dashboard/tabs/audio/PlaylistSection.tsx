import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export const PlaylistSection = () => {
  const { data: currentPlaylist, refetch } = useQuery({
    queryKey: ['current-playlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('skill_playlists')
        .select(`
          *,
          skills:skills (
            id,
            titre,
            resume
          )
        `)
        .eq('user_id', user.id)
        .eq('name', 'Lecture en cours')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const handleRemoveFromPlaylist = async (skillId: string) => {
    if (!currentPlaylist) return;

    const updatedSkills = currentPlaylist.skills.filter((s: any) => s.id !== skillId);
    const { error } = await supabase
      .from('skill_playlists')
      .update({ 
        skills: updatedSkills.map((s: any) => s.id),
        skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
      })
      .eq('id', currentPlaylist.id);

    if (error) {
      toast.error("Erreur lors de la suppression de la compétence");
      return;
    }

    refetch();
    toast.success("Compétence retirée de la playlist");
  };

  if (!currentPlaylist?.skills?.length) {
    return (
      <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
        <p className="text-center text-muted-foreground">
          Aucune compétence dans la playlist
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <h4 className="font-semibold mb-4">Playlist en cours</h4>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {currentPlaylist.skills.map((skill: any, index: number) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
            >
              <span className="text-sm">{index + 1}. {skill.titre}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveFromPlaylist(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};