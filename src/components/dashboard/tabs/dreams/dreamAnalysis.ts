import { pipeline } from "@huggingface/transformers";

export const analyzeDreamText = async (dream: string) => {
  const generator = await pipeline(
    "text-generation",
    "Xenova/gpt2" // Using a more reliable model that's compatible with browser inference
  );

  const prompt = `En tant que coach professionnel, voici mes conseils pour réaliser ce rêve : ${dream}\n\nConseils :\n1.`;
  const result = await generator(prompt, {
    max_new_tokens: 100,
    temperature: 0.7,
  });

  // Handle both array and single result cases
  let generatedText: string;
  
  if (Array.isArray(result)) {
    // If result is an array, take the first item's text
    generatedText = typeof result[0] === 'string' 
      ? result[0] 
      : (result[0] as any).generated_text || '';
  } else {
    // If result is a single item
    generatedText = typeof result === 'string' 
      ? result 
      : (result as any).generated_text || '';
  }
  
  return generatedText
    .split("Conseils :")[1]
    .trim()
    .replace(/^\d+\.\s*/gm, "• ");
};