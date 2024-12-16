import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupList } from "./GroupList";
import { CreateGroupDialog } from "./CreateGroupDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const GroupSection = () => {
  return (
    <Card className="glass-panel">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold gradient-text">Groupes</CardTitle>
        <CreateGroupDialog />
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <GroupList />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};