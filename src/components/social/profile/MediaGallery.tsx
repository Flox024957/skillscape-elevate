import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { FileIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MediaGalleryProps {
  userId: string;
  type: 'image' | 'video' | 'file';
}

export const MediaGallery = ({ userId, type }: MediaGalleryProps) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['profile-media', userId, type],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      switch (type) {
        case 'image':
          query = query.not('image_url', 'is', null);
          break;
        case 'video':
          query = query.like('attachment_type', 'video/%');
          break;
        case 'file':
          query = query
            .not('attachment_url', 'is', null)
            .not('attachment_type', 'like', 'video/%')
            .not('attachment_type', 'like', 'image/%');
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square animate-pulse bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun média à afficher
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square relative group">
            <img
              src={post.image_url}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <p className="text-xs text-white">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="aspect-video relative">
            <video
              src={post.attachment_url}
              className="w-full h-full object-cover rounded-lg"
              controls
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">
                {post.attachment_url.split('/').pop()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(post.attachment_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};