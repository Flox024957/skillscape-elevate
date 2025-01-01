import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistItem } from "./PlaylistItem";

interface PlaylistContentProps {
  playlists: any[];
  onPlay: (content: string) => void;
  onRemoveFromPlaylist: (playlistId: string, skillId: string) => void;
}

export const PlaylistContent = ({ playlists, onPlay, onRemoveFromPlaylist }: PlaylistContentProps) => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {playlists.map((playlist: any) => (
          <div key={playlist.id} className="space-y-2">
            <h5 className="font-medium text-sm">{playlist.name}</h5>
            {playlist.skills?.length > 0 ? (
              <div className="space-y-2">
                {playlist.skills.map((skill: any, index: number) => (
                  <PlaylistItem
                    key={skill.id}
                    skill={skill}
                    index={index}
                    playlistId={playlist.id}
                    onPlay={onPlay}
                    onRemove={onRemoveFromPlaylist}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground px-2">
                Aucune compétence dans cette playlist
              </p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};