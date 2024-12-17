import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CanvasTabProps {
  user: User;
}

const CanvasTab = ({ user }: CanvasTabProps) => {
  const isMobile = useIsMobile();

  const { data: images } = useQuery({
    queryKey: ['canvas-images', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_canvas_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <ScrollArea className="h-[calc(100vh-13rem)]">
      <div className={cn(
        "grid gap-4 p-4",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"
      )}>
        {images?.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg border border-border/50 bg-muted"
          >
            <img
              src={image.image_url}
              alt={image.description || 'Canvas image'}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CanvasTab;