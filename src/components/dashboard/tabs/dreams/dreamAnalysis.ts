import { supabase } from "@/integrations/supabase/client";

export const analyzeDreamText = async (dream: string) => {
  const { data, error } = await supabase.functions.invoke('analyze-dream', {
    body: { dream }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.analysis;
};