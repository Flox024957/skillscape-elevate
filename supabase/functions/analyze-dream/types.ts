export interface DreamAnalysisResponse {
  error?: string;
  analysis: string;
}

export interface HuggingFaceParams {
  max_new_tokens: number;
  temperature: number;
  top_p: number;
  top_k: number;
  repetition_penalty: number;
  return_full_text: boolean;
  wait_for_model: boolean;
}

export interface AnalysisTemplate {
  analysis: string;
  strengths: string[];
  challenges: string[];
  shortTermActions: string[];
  midTermActions: string[];
  longTermActions: string[];
  resources: string[];
  personalDevelopment: string;
}