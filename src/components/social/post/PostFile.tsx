import { Button } from "@/components/ui/button";
import { FileIcon, FileTextIcon, ImageIcon, MusicIcon, VideoIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

interface PostFileProps {
  attachment_url: string;
  attachment_type: string;
}

export const PostFile = ({ attachment_url, attachment_type }: PostFileProps) => {
  if (!attachment_url || !attachment_type) return null;
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return VideoIcon;
    if (type.startsWith('audio/')) return MusicIcon;
    if (type.startsWith('text/')) return FileTextIcon;
    return FileIcon;
  };

  const Icon = getFileIcon(attachment_type);
  const fileName = attachment_url.split('/').pop();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-background/50"
          onClick={() => window.open(attachment_url, '_blank')}
        >
          <Icon className="h-4 w-4" />
          <span className="truncate">{fileName}</span>
          <Badge variant="secondary" className="ml-auto">
            {attachment_type.split('/')[1].toUpperCase()}
          </Badge>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Fichier attaché</h4>
            <p className="text-sm text-muted-foreground">
              Cliquez pour télécharger ou ouvrir le fichier
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};