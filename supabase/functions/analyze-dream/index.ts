import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateDreamAnalysisPrompt } from "./prompts.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dream } = await req.json();
    const HF_TOKEN = Deno.env.get('HUGGINGFACE_API_KEY');

    if (!dream) {
      return new Response(
        JSON.stringify({
          error: "Le rêve est requis",
          analysis: "Veuillez fournir un rêve à analyser."
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!HF_TOKEN) {
      console.error("Token Hugging Face manquant");
      return new Response(
        JSON.stringify({
          error: "Configuration incorrecte",
          analysis: "Service temporairement indisponible."
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = generateDreamAnalysisPrompt(dream);
    console.log("Envoi du prompt à l'API:", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.7,
            top_p: 0.95,
            top_k: 50,
            repetition_penalty: 1.2,
          },
        }),
      }
    );

    const result = await response.json();
    console.log("Réponse brute de l'API:", result);

    if (Array.isArray(result) && result[0]?.generated_text) {
      const analysis = result[0].generated_text.replace(prompt, "").trim();
      console.log("Analyse générée:", analysis);

      return new Response(
        JSON.stringify({ analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.error("Format de réponse inattendu:", result);
      throw new Error("Format de réponse invalide");
    }

  } catch (error) {
    console.error("Erreur dans la fonction analyze-dream:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        analysis: "Une erreur est survenue lors de l'analyse. Veuillez réessayer."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});