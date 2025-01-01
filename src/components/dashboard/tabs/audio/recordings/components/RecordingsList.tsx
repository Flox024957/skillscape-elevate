import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Recording {
  id: string;
  title: string;
  audio_url: string;
  created_at: string;
}

interface RecordingsListProps {
  recordings: Recording[];
  onDelete: (id: string, url: string) => void;
}

const RecordingsList = ({ recordings, onDelete }: RecordingsListProps) => {
  return (
    <ScrollArea className="h-[300px] rounded-md border border-[#1E3D7B]/30 bg-[#1E3D7B]/10 p-4">
      {recordings?.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Aucun enregistrement
        </div>
      ) : (
        <div className="space-y-4">
          {recordings?.map((recording) => (
            <div
              key={recording.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[#1E3D7B]/20 border border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/30 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-[#E5DEFF]">{recording.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(recording.created_at), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <audio
                  controls
                  src={recording.audio_url}
                  className="h-8 w-48 md:w-64"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(recording.id, recording.audio_url)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default RecordingsList;