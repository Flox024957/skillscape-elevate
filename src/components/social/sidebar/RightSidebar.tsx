import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateGroupDialog } from "../groups/CreateGroupDialog";
import { GroupList } from "../groups/GroupList";
import { EventsList } from "../events/EventsList";
import { CreateEventDialog } from "../events/CreateEventDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@supabase/auth-helpers-react";

export const RightSidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="hidden lg:flex flex-col w-80 min-h-screen bg-card/50 border-l border-border p-4 space-y-6 sticky top-16">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Groupes</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/groups/manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Gestion des groupes
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateGroupDialog />
          <ScrollArea className="h-[200px]">
            <GroupList />
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Événements</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/events/manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Gestion des événements
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateEventDialog userId={user.id} />
          <ScrollArea className="h-[200px]">
            <EventsList userId={user.id} />
          </ScrollArea>
        </CardContent>
      </Card>
    </aside>
  );
};