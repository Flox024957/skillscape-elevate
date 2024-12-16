import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { UserDream } from "@/integrations/supabase/types";

export const DreamHistory = () => {
  const { data: dreams, isLoading } = useQuery({
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
        <p className="text-muted-foreground">Aucun rêve analysé pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
      <h2 className="text-2xl font-bold mb-6">Historique des Analyses</h2>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {dreams.map((dream) => (
            <Card key={dream.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{dream.title || "Rêve professionnel"}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(dream.created_at), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{dream.content}</p>
              <div className="space-y-2">
                {dream.analysis && (
                  <div className="text-sm">
                    <strong>Analyse :</strong>
                    <p className="mt-1 text-muted-foreground">{dream.analysis}</p>
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