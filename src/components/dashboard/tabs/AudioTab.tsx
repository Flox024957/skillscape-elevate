import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Folder, List, Mic } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { data: userNotes, isLoading } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Lecteur Audio</span>
          <Button 
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
          >
            <Mic className="w-4 h-4 mr-2" />
            {isRecording ? "Arrêter" : "Enregistrer"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="player" className="space-y-4">
          <TabsList>
            <TabsTrigger value="player" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="folders" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Dossiers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="player" className="space-y-4">
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-2">
                {isLoading ? (
                  <p className="text-muted-foreground">Chargement des notes...</p>
                ) : userNotes?.length === 0 ? (
                  <p className="text-muted-foreground">Aucune note à lire</p>
                ) : (
                  userNotes?.map((note) => (
                    <Button
                      key={note.id}
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setSelectedContent(note.content)}
                    >
                      {note.content.substring(0, 50)}...
                    </Button>
                  ))
                )}
              </div>
            </ScrollArea>

            <AudioPlayer 
              selectedContent={selectedContent}
              userNotes={userNotes}
              onContentSelect={handleContentSelect}
            />
          </TabsContent>

          <TabsContent value="folders" className="min-h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Fonctionnalité de dossiers audio à venir...
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudioTab;