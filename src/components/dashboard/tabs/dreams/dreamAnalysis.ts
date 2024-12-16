import { pipeline } from "@huggingface/transformers";

export const analyzeDreamText = async (dream: string) => {
  const generator = await pipeline(
    "text-generation",
    "facebook/opt-125m"
  );

  const prompt = `En tant que coach professionnel, voici mes conseils pour réaliser ce rêve : ${dream}\n\nConseils :\n1.`;
  const result = await generator(prompt, {
    max_new_tokens: 100,
    temperature: 0.7,
  });

  const generatedText = Array.isArray(result) ? result[0] : result;
  const text = typeof generatedText === 'string' ? generatedText : generatedText.text;
  
  return text
    .split("Conseils :")[1]
    .trim()
    .replace(/^\d+\.\s*/gm, "• ");
};