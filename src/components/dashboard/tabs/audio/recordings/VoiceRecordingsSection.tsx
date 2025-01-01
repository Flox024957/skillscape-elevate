import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, FolderPlus, Trash, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Recording {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration: number | null;
  folder: string;
  created_at: string;
}

const VoiceRecordingsSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTitle, setRecordingTitle] = useState("");
  const { toast } = useToast();

  const { data: recordings, refetch } = useQuery({
    queryKey: ['voice-recordings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_voice_recordings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Recording[];
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        await uploadRecording(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder au microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const uploadRecording = async (blob: Blob) => {
    if (!recordingTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez donner un titre à l'enregistrement",
        variant: "destructive",
      });
      return;
    }

    try {
      const filename = `${crypto.randomUUID()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voice-recordings')
        .upload(filename, blob);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from('voice-recordings')
        .getPublicUrl(filename);

      const { error: dbError } = await supabase
        .from('user_voice_recordings')
        .insert({
          title: recordingTitle,
          audio_url: publicUrl.publicUrl,
          duration: Math.round(blob.size / 16000), // Estimation approximative
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Enregistrement sauvegardé avec succès",
      });

      setRecordingTitle("");
      refetch();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'enregistrement",
        variant: "destructive",
      });
    }
  };

  const deleteRecording = async (id: string, audioUrl: string) => {
    try {
      const filename = audioUrl.split('/').pop();
      if (filename) {
        await supabase.storage
          .from('voice-recordings')
          .remove([filename]);
      }

      const { error } = await supabase
        .from('user_voice_recordings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Enregistrement supprimé avec succès",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-[#E5DEFF]">
          <span>Mes enregistrements vocaux</span>
          <div className="flex gap-2">
            <Input
              placeholder="Titre de l'enregistrement"
              value={recordingTitle}
              onChange={(e) => setRecordingTitle(e.target.value)}
              className="max-w-[200px] bg-[#1E3D7B]/20 border-[#1E3D7B]/30"
            />
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={isRecording ? stopRecording : startRecording}
              className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40"
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
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1E3D7B]/20 border border-[#1E3D7B]/30"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-[#E5DEFF]">{recording.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(recording.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <audio
                      controls
                      src={recording.audio_url}
                      className="h-8"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRecording(recording.id, recording.audio_url)}
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
      </CardContent>
    </Card>
  );
};

export default VoiceRecordingsSection;