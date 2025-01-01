import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlaylistSelectorProps {
  currentPlaylist: string | null;
  onPlaylistSelect: (playlistId: string) => void;
}

const PlaylistSelector = ({ currentPlaylist, onPlaylistSelect }: PlaylistSelectorProps) => {
  const { data: playlists } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: playlists, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return playlists;
    },
  });

  return (
    <div className="w-full">
      <Select
        value={currentPlaylist || undefined}
        onValueChange={onPlaylistSelect}
      >
        <SelectTrigger className="w-full bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
          <SelectValue placeholder="Sélectionner une playlist" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current">Lecture en cours</SelectItem>
          {playlists?.map((playlist) => (
            <SelectItem key={playlist.id} value={playlist.id}>
              {playlist.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlaylistSelector;