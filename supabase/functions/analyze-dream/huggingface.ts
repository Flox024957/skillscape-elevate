import { HuggingFaceParams } from './types';

export const MODEL_URL = "https://api-inference.huggingface.co/models/distributed/optimized-gpt2-2b";

export const getDefaultParams = (): HuggingFaceParams => ({
  max_new_tokens: 1000,
  temperature: 0.7,
  top_p: 0.9,
  top_k: 40,
  repetition_penalty: 1.2,
  return_full_text: false,
  wait_for_model: true
});

export async function queryHuggingFace(
  prompt: string,
  token: string,
  signal: AbortSignal
): Promise<string> {
  const response = await fetch(MODEL_URL, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      parameters: getDefaultParams()
    }),
    signal
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const result = await response.json();
  return result[0].generated_text;
}