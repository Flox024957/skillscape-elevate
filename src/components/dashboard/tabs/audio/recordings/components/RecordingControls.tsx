import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordingControlsProps {
  isRecording: boolean;
  recordingTitle: string;
  onTitleChange: (value: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const RecordingControls = ({
  isRecording,
  recordingTitle,
  onTitleChange,
  onStartRecording,
  onStopRecording,
}: RecordingControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <Input
        placeholder="Titre de l'enregistrement"
        value={recordingTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="max-w-[300px] bg-[#1E3D7B]/20 border-[#1E3D7B]/30 text-[#E5DEFF]"
        disabled={isRecording}
      />
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="sm"
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={cn(
          "relative",
          isRecording 
            ? "bg-red-500/20 hover:bg-red-500/30 text-red-500" 
            : "bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40 text-[#E5DEFF]"
        )}
      >
        {isRecording ? (
          <>
            <MicOff className="w-4 h-4 mr-2 animate-pulse" />
            Arrêter l'enregistrement
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Commencer l'enregistrement
          </>
        )}
      </Button>
    </div>
  );
};

export default RecordingControls;