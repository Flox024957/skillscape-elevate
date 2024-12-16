import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface UserMediaGalleryProps {
  userId: string;
}

export const UserMediaGallery = ({ userId }: UserMediaGalleryProps) => {
  const { data: media, isLoading } = useQuery({
    queryKey: ['user-media', userId],
    queryFn: async () => {
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('image_url')
        .eq('user_id', userId)
        .not('image_url', 'is', null)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const { data: canvasImages, error: canvasError } = await supabase
        .from('user_canvas_images')
        .select('image_url')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (canvasError) throw canvasError;

      return [
        ...(posts || []).map(p => p.image_url),
        ...(canvasImages || []).map(c => c.image_url)
      ].filter(Boolean);
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="w-full h-24" />
        ))}
      </div>
    );
  }

  if (!media?.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Aucun média partagé
      </p>
    );
  }

  return (
    <ScrollArea className="h-[300px] w-full">
      <div className="grid grid-cols-3 gap-2">
        {media.map((url, index) => (
          <AspectRatio key={index} ratio={1}>
            <img
              src={url}
              alt={`Media ${index + 1}`}
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
        ))}
      </div>
    </ScrollArea>
  );
};