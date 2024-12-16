import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold gradient-text group-hover:scale-105 transition-transform">
              {event.title}
            </h3>
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
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {event.description}
          </p>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
            >
              Voir les détails
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};