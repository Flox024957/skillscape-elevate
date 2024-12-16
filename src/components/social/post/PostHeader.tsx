import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface PostHeaderProps {
  profile: {
    id: string;
    pseudo: string;
    image_profile: string;
  };
  createdAt: string;
  postId: string;
  currentUserId: string;
}

export const PostHeader = ({ profile, createdAt, postId, currentUserId }: PostHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isCurrentUser = profile.id === currentUserId;

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      toast({
        title: "Publication supprimée",
        description: "Votre publication a été supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la publication",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar 
          className="cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => navigate(`/profile/${profile.id}`)}
        >
          <AvatarImage src={profile.image_profile} />
          <AvatarFallback>{profile.pseudo?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 
            className="font-semibold hover:text-primary cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            {profile.pseudo}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: fr,
            })}
          </p>
        </div>
      </div>

      {isCurrentUser && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};