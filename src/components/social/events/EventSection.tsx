import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventsList } from "./EventsList";
import { CreateEventDialog } from "./CreateEventDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold gradient-text">Événements</CardTitle>
        <CreateEventDialog userId={userId} />
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <EventsList userId={userId} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};