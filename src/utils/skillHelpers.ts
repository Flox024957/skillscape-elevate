import { Json } from "@/integrations/supabase/types";

// Helper function to normalize examples to always be an array
export const normalizeExamples = (examples: Json | null): Json[] => {
  if (Array.isArray(examples)) {
    return examples;
  }
  if (examples === null || examples === undefined) {
    return [];
  }
  // If it's a single value, wrap it in an array
  return [examples];
};