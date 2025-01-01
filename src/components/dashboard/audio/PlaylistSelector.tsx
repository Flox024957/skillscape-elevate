import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlaylistSelectorProps {
  selectedPlaylist: string | null;
  onPlaylistChange: (value: string) => void;
}

const PlaylistSelector = ({ selectedPlaylist, onPlaylistChange }: PlaylistSelectorProps) => {
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

  return (
    <Select value={selectedPlaylist || undefined} onValueChange={onPlaylistChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sélectionner une playlist" />
      </SelectTrigger>
      <SelectContent>
        {playlists?.map((playlist) => (
          <SelectItem key={playlist.id} value={playlist.id}>
            {playlist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlaylistSelector;