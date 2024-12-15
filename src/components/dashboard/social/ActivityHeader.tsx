import { Bell, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ActivityHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Bell className="h-5 w-5" />
        Activité récente
      </h3>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Partager mon profil
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};