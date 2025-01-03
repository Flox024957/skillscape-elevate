import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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

      const groupsWithDetails = await Promise.all(
        groupsData.map(async (group) => {
          const { count } = await supabase
            .from('group_members')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', group.id);

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
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!groups.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-6 border border-dashed rounded-lg"
      >
        <p className="text-muted-foreground">Aucun groupe trouvé</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {groups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="p-4">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="gradient-text">{group.name}</span>
                {group.is_private && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {group.description}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {group.members_count} membres
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary hover:text-white transition-colors"
                  >
                    Voir le groupe
                  </Button>
                </div>
                {group.next_event && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-primary/10">
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
        </motion.div>
      ))}
    </div>
  );
};