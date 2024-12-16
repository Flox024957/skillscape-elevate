import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Database } from "@/integrations/supabase/types";
import { Sparkles, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UserDream = Database["public"]["Tables"]["user_dreams"]["Row"];

export const DreamHistory = () => {
  const { data: dreams, isLoading, refetch } = useQuery({
    queryKey: ["dreams-history"],
    queryFn: async () => {
      const { data: dreams, error } = await supabase
        .from("user_dreams")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return dreams as UserDream[];
    },
  });

  const handleDelete = async (dreamId: string) => {
    try {
      const { error } = await supabase
        .from("user_dreams")
        .delete()
        .eq("id", dreamId);

      if (error) throw error;

      toast.success("Rêve supprimé avec succès");
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du rêve");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
        <p className="text-muted-foreground">Chargement de l'historique...</p>
      </div>
    );
  }

  if (!dreams?.length) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
        <div className="text-center py-8">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Aucun rêve analysé pour le moment.
            <br />
            Commencez par décrire votre rêve professionnel dans l'onglet "Analyser".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-400" />
        Historique des Analyses
      </h2>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {dreams.map((dream) => (
            <Card key={dream.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">
                  {dream.title || "Rêve professionnel"}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(dream.created_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => handleDelete(dream.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Description du rêve</h4>
                  <p className="text-muted-foreground">{dream.content}</p>
                </div>
                
                {dream.analysis && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-primary">Analyse</h4>
                    <div className="text-muted-foreground whitespace-pre-line">
                      {dream.analysis}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};