import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, VideoIcon, FileIcon } from "lucide-react";

export const MediaGallery = ({ userId }: { userId: string }) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['profile-media', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .not('image_url', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-lg" />
        ))}
      </div>
    </div>;
  }

  return (
    <Tabs defaultValue="images" className="w-full">
      <TabsList>
        <TabsTrigger value="images">
          <ImageIcon className="h-4 w-4 mr-2" />
          Images
        </TabsTrigger>
        <TabsTrigger value="videos">
          <VideoIcon className="h-4 w-4 mr-2" />
          Vidéos
        </TabsTrigger>
        <TabsTrigger value="files">
          <FileIcon className="h-4 w-4 mr-2" />
          Fichiers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="images" className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts?.filter(post => post.image_url).map((post) => (
            <div key={post.id} className="aspect-square relative group">
              <img
                src={post.image_url}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="videos" className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts?.filter(post => post.attachment_type?.startsWith('video/')).map((post) => (
            <div key={post.id} className="aspect-video relative group">
              <video
                src={post.attachment_url}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="files" className="mt-4">
        <div className="space-y-2">
          {posts?.filter(post => post.attachment_url && !post.attachment_type?.startsWith('video/')).map((post) => (
            <a
              key={post.id}
              href={post.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 hover:bg-accent rounded-lg"
            >
              <FileIcon className="h-4 w-4 mr-2" />
              <span className="truncate">{post.attachment_url.split('/').pop()}</span>
            </a>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};