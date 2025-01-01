import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useVoiceRecorder } from "./hooks/useVoiceRecorder";
import RecordingControls from "./components/RecordingControls";
import RecordingsList from "./components/RecordingsList";

const VoiceRecordingsSection = () => {
  const [recordingTitle, setRecordingTitle] = useState("");
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();
  const { toast } = useToast();

  const { data: recordings, refetch } = useQuery({
    queryKey: ['voice-recordings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_voice_recordings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleStartRecording = () => {
    if (!recordingTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez donner un titre à l'enregistrement",
        variant: "destructive",
      });
      return;
    }
    startRecording();
  };

  const handleStopRecording = async () => {
    try {
      const blob = await stopRecording();
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
        description: "Enregistrement sauvegardé",
      });

      setRecordingTitle("");
      refetch();
    } catch (error) {
      console.error('Error saving recording:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'enregistrement",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRecording = async (id: string, audioUrl: string) => {
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
        description: "Enregistrement supprimé",
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
        <CardTitle className="text-[#E5DEFF]">
          Mes enregistrements vocaux
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RecordingControls
          isRecording={isRecording}
          recordingTitle={recordingTitle}
          onTitleChange={setRecordingTitle}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
        <RecordingsList
          recordings={recordings}
          onDelete={handleDeleteRecording}
        />
      </CardContent>
    </Card>
  );
};

export default VoiceRecordingsSection;