import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventsList } from "./EventsList";
import { CreateEventDialog } from "./CreateEventDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventSection = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, []);

  if (!userId) return null;

  return (
    <Card className="glass-panel">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Événements
        </CardTitle>
        <CreateEventDialog userId={userId}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </CreateEventDialog>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4">
          <EventsList userId={userId} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};