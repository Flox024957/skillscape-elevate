import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash, Play, Pause } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from "react";

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
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayPause = (recordingId: string, audioElement: HTMLAudioElement) => {
    if (playingId === recordingId) {
      audioElement.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        const previousAudio = document.querySelector(`audio[data-id="${playingId}"]`) as HTMLAudioElement;
        if (previousAudio) {
          previousAudio.pause();
        }
      }
      audioElement.play();
      setPlayingId(recordingId);
    }
  };

  const handleAudioEnded = () => {
    setPlayingId(null);
  };

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
              className="flex items-center justify-between p-3 rounded-lg bg-[#1E3D7B]/20 border border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/30 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#E5DEFF] truncate">{recording.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(recording.created_at), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E5DEFF] hover:text-[#E5DEFF]/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const audio = document.querySelector(`audio[data-id="${recording.id}"]`) as HTMLAudioElement;
                    if (audio) {
                      handlePlayPause(recording.id, audio);
                    }
                  }}
                >
                  {playingId === recording.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <audio
                  data-id={recording.id}
                  src={recording.audio_url}
                  onEnded={handleAudioEnded}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(recording.id, recording.audio_url)}
                  className="text-destructive hover:text-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
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