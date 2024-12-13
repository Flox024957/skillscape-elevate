import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "@/components/dashboard/AudioPlayer";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");

  const { data: userNotes } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
  });

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="space-y-4">
        <select
          value={selectedContent}
          onChange={(e) => setSelectedContent(e.target.value)}
          className="bg-transparent border rounded p-2 w-full"
        >
          <option value="">Select content to play</option>
          {userNotes?.map((note) => (
            <option key={note.id} value={note.content}>
              {note.content.substring(0, 50)}...
            </option>
          ))}
        </select>
        <AudioPlayer 
          selectedContent={selectedContent}
          userNotes={userNotes}
          onContentSelect={handleContentSelect}
        />
      </div>
    </div>
  );
};

export default AudioTab;