import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Group {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
  members_count: number;
  next_event?: {
    title: string;
    start_time: string;
  } | null;
}

export const GroupList = () => {
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      // First, get the groups
      const { data: groupsData, error: groupsError } = await supabase
        .from('groups')
        .select(`
          id,
          name,
          description,
          is_private,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (groupsError) throw groupsError;

      // Then, for each group, get the member count and next event
      const groupsWithDetails = await Promise.all(
        groupsData.map(async (group) => {
          const { count } = await supabase
            .from('group_members')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', group.id);

          // Get the next upcoming event for this group
          const { data: nextEvent } = await supabase
            .from('user_events')
            .select('title, start_time')
            .eq('group_id', group.id)
            .gte('start_time', new Date().toISOString())
            .order('start_time', { ascending: true })
            .limit(1)
            .single();

          return {
            ...group,
            members_count: count || 0,
            next_event: nextEvent
          };
        })
      );

      return groupsWithDetails;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    );
  }

  if (!groups.length) {
    return (
      <div className="text-center p-6 border border-dashed rounded-lg">
        <p className="text-muted-foreground">Aucun groupe trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <Card key={group.id} className="hover:bg-accent/50 transition-colors">
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center justify-between">
              {group.name}
              {group.is_private && <Lock className="h-4 w-4 text-muted-foreground" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              {group.description}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members_count} membres
                </div>
                <Button variant="outline" size="sm">
                  Voir le groupe
                </Button>
              </div>
              {group.next_event && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">
                      {format(new Date(group.next_event.start_time), "d MMMM", { locale: fr })}
                    </span>
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {group.next_event.title}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};