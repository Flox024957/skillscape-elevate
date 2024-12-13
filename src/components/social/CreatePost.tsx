import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Loader2 } from 'lucide-react';

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setIsLoading(true);
    try {
      let imageUrl = null;
      
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('posts')
          .upload(`${userId}/${fileName}`, image);

        if (uploadError) throw uploadError;
        imageUrl = data.path;
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userId,
            content,
            image_url: imageUrl,
          },
        ]);

      if (error) throw error;

      setContent('');
      setImage(null);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      toast({
        title: "Publication créée",
        description: "Votre message a été publié avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la publication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg p-4 space-y-4">
      <Textarea
        placeholder="Que voulez-vous partager ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => document.getElementById('image')?.click()}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          {image && <span className="text-sm text-muted-foreground">{image.name}</span>}
        </div>

        <Button type="submit" disabled={isLoading || (!content.trim() && !image)}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publication...
            </>
          ) : (
            'Publier'
          )}
        </Button>
      </div>
    </form>
  );
};