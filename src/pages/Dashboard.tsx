import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, Upload } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("default");
  const [selectedContent, setSelectedContent] = useState("");

  const { data: userSkills } = useQuery({
    queryKey: ['userSkills'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_skills')
        .select(`
          skill_id,
          skills (
            id,
            title,
            summary,
            explanation,
            concrete_action,
            examples
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
  });

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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session) {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const saveNote = async () => {
    if (!user || !note) return;

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: note,
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Could not save note",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Note saved successfully",
      });
      setNote("");
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('canvas-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Could not upload image",
        variant: "destructive",
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('canvas-images')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('user_canvas_images')
      .insert([{
        user_id: user.id,
        image_url: publicUrl,
      }]);

    if (dbError) {
      toast({
        title: "Error",
        description: "Could not save image reference",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-flap-black to-flap-black/95 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glass-panel p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome, {user.user_metadata.full_name || user.email}
                </h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate("/main")}>
                Explore Skills
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="skills">Skills & Actions</TabsTrigger>
            <TabsTrigger value="notes">Notes & Calendar</TabsTrigger>
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="audio">Audio Player</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userSkills?.map((userSkill) => (
                <motion.div
                  key={userSkill.skill_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {userSkill.skills.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {userSkill.skills.summary}
                  </p>
                  <div className="text-sm text-flap-neon">
                    Action: {userSkill.skills.concrete_action}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                />
              </div>
              <div className="glass-panel p-4 space-y-4">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write a note..."
                  className="min-h-[200px]"
                />
                <Button onClick={saveNote}>Save Note</Button>
                <div className="space-y-2">
                  {userNotes?.map((note) => (
                    <div key={note.id} className="text-sm text-gray-400">
                      {note.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="canvas" className="space-y-4">
            <div className="glass-panel p-4">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-8">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">
                      Click to upload an image
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="glass-panel p-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="bg-transparent border rounded p-2"
                  >
                    <option value="default">Default Voice</option>
                    <option value="voice1">Voice 1</option>
                    <option value="voice2">Voice 2</option>
                  </select>
                  <select
                    value={selectedContent}
                    onChange={(e) => setSelectedContent(e.target.value)}
                    className="bg-transparent border rounded p-2 flex-1"
                  >
                    <option value="">Select content to play</option>
                    {userNotes?.map((note) => (
                      <option key={note.id} value={note.content}>
                        {note.content.substring(0, 50)}...
                      </option>
                    ))}
                  </select>
                  <Button
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;