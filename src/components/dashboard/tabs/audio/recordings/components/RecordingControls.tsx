import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff } from "lucide-react";

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
        className="max-w-[300px] bg-[#1E3D7B]/20 border-[#1E3D7B]/30"
      />
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="sm"
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={isRecording 
          ? "bg-red-500/20 hover:bg-red-500/30" 
          : "bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40"}
      >
        {isRecording ? (
          <>
            <MicOff className="w-4 h-4 mr-2" />
            Arrêter
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Enregistrer
          </>
        )}
      </Button>
    </div>
  );
};

export default RecordingControls;