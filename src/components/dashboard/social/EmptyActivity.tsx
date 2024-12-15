import { Bell } from "lucide-react";

export const EmptyActivity = () => {
  return (
    <div className="text-center text-muted-foreground p-8 border border-dashed border-border rounded-lg">
      <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
      <p className="font-medium">Aucune activité récente</p>
      <p className="text-sm text-muted-foreground mt-1">
        Les interactions avec vos amis apparaîtront ici
      </p>
    </div>
  );
};