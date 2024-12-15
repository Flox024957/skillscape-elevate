import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lock } from "lucide-react";

export const GroupList = () => {
  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          id,
          name,
          description,
          is_private,
          created_at,
          group_members (count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
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
                {group.group_members?.count || 0} members
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