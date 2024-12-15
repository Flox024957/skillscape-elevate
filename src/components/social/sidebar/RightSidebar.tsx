import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateGroupDialog } from "../groups/CreateGroupDialog";
import { GroupList } from "../groups/GroupList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RightSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-80 min-h-screen bg-card/50 border-l border-border p-4 space-y-6 sticky top-16">
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateGroupDialog />
        </CardContent>
      </Card>
      
      <ScrollArea className="flex-1">
        <GroupList />
      </ScrollArea>
    </aside>
  );
};