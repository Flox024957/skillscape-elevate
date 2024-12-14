export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: number;
  created_at: string;
  updated_at: string;
}