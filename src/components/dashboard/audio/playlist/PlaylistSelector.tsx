import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlaylistSelectorProps {
  selectedPlaylist: string | null;
  onPlaylistChange: (value: string) => void;
}

export const PlaylistSelector = ({ selectedPlaylist, onPlaylistChange }: PlaylistSelectorProps) => {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching playlists:', error);
        return [];
      }
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-[200px] bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
          <SelectValue placeholder="Chargement..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={selectedPlaylist || undefined} onValueChange={onPlaylistChange}>
      <SelectTrigger className="w-[200px] bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
        <SelectValue placeholder="Sélectionner une playlist" />
      </SelectTrigger>
      <SelectContent>
        {playlists?.map((playlist) => (
          <SelectItem 
            key={playlist.id} 
            value={playlist.id}
            className="cursor-pointer hover:bg-[#0EA5E9]/20"
          >
            {playlist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};