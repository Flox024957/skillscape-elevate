import { StickyNote, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MonthData } from "./types";

interface MonthCardProps {
  month: Date;
  data: MonthData;
  onClick: () => void;
}

export const MonthCard = ({ month, data, onClick }: MonthCardProps) => {
  const hasContent = data.notes.length > 0 || data.events.length > 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`p-4 rounded-lg border ${
              hasContent 
                ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' 
                : 'border-border hover:bg-muted/50'
            } transition-colors cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            layout
          >
            <div className="text-sm font-medium mb-2">
              {format(month, 'MMMM', { locale: fr })}
            </div>
            <div className="flex gap-2">
              {data.notes.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <StickyNote className="h-3 w-3" />
                  {data.notes.length}
                </Badge>
              )}
              {data.events.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {data.events.length}
                </Badge>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            {data.notes.length > 0 && (
              <div className="flex items-center gap-1">
                <StickyNote className="h-3 w-3" />
                {data.notes.length} note{data.notes.length > 1 ? 's' : ''}
              </div>
            )}
            {data.events.length > 0 && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {data.events.length} événement{data.events.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};