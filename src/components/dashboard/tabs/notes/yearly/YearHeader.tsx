import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface YearHeaderProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const YearHeader = ({ selectedYear, setSelectedYear }: YearHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CalendarCheck className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Calendrier Annuel {selectedYear}</h2>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedYear(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setSelectedYear(new Date().getFullYear())}
        >
          Aujourd'hui
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedYear(prev => prev + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};