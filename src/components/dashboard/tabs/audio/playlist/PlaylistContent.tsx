import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistItem } from "./PlaylistItem";

interface PlaylistContentProps {
  skills: any[];
  onRemoveFromPlaylist: (skillId: string) => void;
  onPlaySkill: (skillId: string) => void;
}

export const PlaylistContent = ({ skills, onRemoveFromPlaylist, onPlaySkill }: PlaylistContentProps) => {
  if (!skills.length) {
    return (
      <p className="text-center text-muted-foreground">
        Aucune compétence dans la playlist
      </p>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-2">
        {skills.map((skill: any, index: number) => (
          <PlaylistItem
            key={skill.id}
            index={index}
            title={skill.titre}
            onRemove={() => onRemoveFromPlaylist(skill.id)}
            onPlay={() => onPlaySkill(skill.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};