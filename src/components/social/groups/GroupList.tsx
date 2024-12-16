import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lock } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
  members_count: number;
}

export const GroupList = () => {
  const { data: groups = [] } = useQuery<Group[]>({
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

      // Then, for each group, get the member count separately
      const groupsWithCounts = await Promise.all(
        groupsData.map(async (group) => {
          const { count } = await supabase
            .from('group_members')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', group.id);

          return {
            ...group,
            members_count: count || 0
          };
        })
      );

      return groupsWithCounts;
    },
  });

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
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {group.members_count} members
              </div>
              <Button variant="outline" size="sm">
                View Group
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};