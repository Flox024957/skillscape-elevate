import { PlaylistSelector } from "./PlaylistSelector";
import { PlaylistCreator } from "./PlaylistCreator";

interface PlaylistControlsProps {
  selectedPlaylist: string | null;
  onPlaylistChange: (playlistId: string) => void;
}

export const PlaylistControls = ({
  selectedPlaylist,
  onPlaylistChange,
}: PlaylistControlsProps) => {
  return (
    <div className="flex justify-between items-center">
      <PlaylistSelector
        selectedPlaylist={selectedPlaylist}
        onPlaylistChange={onPlaylistChange}
      />
      <PlaylistCreator />
    </div>
  );
};