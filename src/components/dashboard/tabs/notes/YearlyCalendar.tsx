import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eachMonthOfInterval } from "date-fns";
import { YearHeader } from "./yearly/YearHeader";
import { MonthCard } from "./yearly/MonthCard";
import { MonthDetailDialog } from "./yearly/MonthDetailDialog";
import { useYearData, getMonthData } from "./yearly/useYearData";

interface YearlyCalendarProps {
  userId: string;
}

export const YearlyCalendar = ({ userId }: YearlyCalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const { data: yearData } = useYearData(userId, selectedYear);

  const months = eachMonthOfInterval({
    start: new Date(selectedYear, 0),
    end: new Date(selectedYear, 11)
  });

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <YearHeader 
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {months.map((month) => {
            const monthData = getMonthData(yearData, month);
            return (
              <MonthCard
                key={month.toString()}
                month={month}
                data={monthData}
                onClick={() => setSelectedMonth(month)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <MonthDetailDialog
        selectedMonth={selectedMonth}
        data={selectedMonth ? getMonthData(yearData, selectedMonth) : { notes: [], events: [] }}
        onClose={() => setSelectedMonth(null)}
      />
    </motion.div>
  );
};