import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
  };
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{event.title}</h3>
            <Badge variant="secondary" className="bg-primary/10">
              Événement
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              {format(new Date(event.start_time), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{event.location}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};