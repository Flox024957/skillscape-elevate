import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostProps {
  userId: string;
}

export const CreatePost = ({ userId }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([{ user_id: userId, content }]);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la publication",
        variant: "destructive",
      });
      return;
    }

    setContent('');
    toast({
      title: "Succès",
      description: "Publication créée avec succès",
    });
  };

  return (
    <div className="bg-card p-4 rounded-lg space-y-4">
      <Textarea
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !content.trim()}
        >
          Publier
        </Button>
      </div>
    </div>
  );
};