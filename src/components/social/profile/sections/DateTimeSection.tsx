import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const DateTimeSection = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Date et Heure</h3>
        </div>
        <div className="space-y-2">
          <p className="text-lg">{formatDate(currentDateTime)}</p>
          <p className="text-2xl font-semibold text-primary">{formatTime(currentDateTime)}</p>
        </div>
      </CardContent>
    </Card>
  );
};