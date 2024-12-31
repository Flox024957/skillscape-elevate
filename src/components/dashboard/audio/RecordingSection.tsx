import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const RecordingSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [recordingTitle, setRecordingTitle] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const { data: recordings = [], refetch: refetchRecordings } = useQuery({
    queryKey: ['user-recordings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_recordings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder au microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;

    return new Promise<void>((resolve) => {
      if (!mediaRecorderRef.current) return;

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        resolve();
      };

      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    });
  };

  const saveRecording = async () => {
    if (!mediaRecorderRef.current || chunksRef.current.length === 0) return;

    try {
      setIsSaving(true);
      await stopRecording();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const fileName = `${user.id}/${Date.now()}.webm`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-recordings')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from('audio-recordings')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('user_recordings')
        .insert({
          user_id: user.id,
          title: recordingTitle || `Enregistrement ${new Date().toLocaleString()}`,
          audio_url: publicUrl.publicUrl,
          duration: 0, // To be implemented
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Enregistrement sauvegardé avec succès",
      });

      setRecordingTitle("");
      refetchRecordings();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'enregistrement",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Titre de l'enregistrement"
          value={recordingTitle}
          onChange={(e) => setRecordingTitle(e.target.value)}
          className="flex-1"
        />
        {isRecording ? (
          <Button
            variant="destructive"
            size="icon"
            onClick={saveRecording}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Square className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            onClick={startRecording}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/80"
          >
            <Mic className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Mes enregistrements
        </h3>
        <div className="space-y-2">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
            >
              <span className="text-sm">{recording.title}</span>
              <audio src={recording.audio_url} controls className="h-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};