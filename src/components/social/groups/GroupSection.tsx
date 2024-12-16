import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupList } from "./GroupList";
import { CreateGroupDialog } from "./CreateGroupDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GroupSection = () => {
  return (
    <Card className="glass-panel mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Groupes
        </CardTitle>
        <CreateGroupDialog>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </CreateGroupDialog>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4">
          <GroupList />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};