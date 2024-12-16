export interface Note {
  id: string;
  content: string;
  created_at: string;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  location?: string;
}

export interface MonthData {
  notes: Note[];
  events: Event[];
}

export interface YearData {
  notes: Note[];
  events: Event[];
}