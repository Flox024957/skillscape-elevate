import { HuggingFaceParams } from './types.ts';

export const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

export const getDefaultParams = (): HuggingFaceParams => ({
  max_new_tokens: 2000, // Augmenté pour permettre des réponses plus longues
  temperature: 0.7,
  top_p: 0.9,
  top_k: 50,
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
    console.error(`Hugging Face API error: ${response.status}`);
    throw new Error(`API Error: ${response.status}`);
  }

  const result = await response.json();
  
  if (!result || !Array.isArray(result) || result.length === 0) {
    console.error('Invalid response format from Hugging Face API:', result);
    throw new Error('Invalid API response format');
  }

  return result[0].generated_text;
}