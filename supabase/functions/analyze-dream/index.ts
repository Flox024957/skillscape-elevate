import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { generateDreamAnalysisPrompt } from "./prompts.ts";
import { queryHuggingFace } from "./huggingface.ts";
import { DreamAnalysisResponse } from "./types.ts";

const TIMEOUT_DURATION = 60000; // 60 secondes pour laisser plus de temps au modèle

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { dream } = await req.json();
    const HF_TOKEN = Deno.env.get("HUGGINGFACE_API_KEY");

    if (!dream) {
      return new Response(
        JSON.stringify({
          error: "Le rêve est requis",
          analysis: "Veuillez fournir un rêve à analyser."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!HF_TOKEN) {
      console.error("Token Hugging Face manquant");
      return new Response(
        JSON.stringify({
          error: "Configuration incorrecte",
          analysis: "Service temporairement indisponible."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    try {
      console.log("Début de l'analyse du rêve...");
      const prompt = generateDreamAnalysisPrompt(dream);
      const analysis = await queryHuggingFace(prompt, HF_TOKEN, controller.signal);
      
      console.log("Analyse terminée avec succès");
      
      // Sauvegarder l'analyse dans la base de données
      const response: DreamAnalysisResponse = {
        analysis: analysis.trim()
      };

      return new Response(
        JSON.stringify(response),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } catch (apiError) {
      console.error("Erreur API:", apiError);
      
      const errorResponse: DreamAnalysisResponse = {
        error: apiError.name === 'AbortError' 
          ? "Délai d'attente dépassé" 
          : `Erreur API: ${apiError.message || apiError.status || 500}`,
        analysis: "Une erreur est survenue lors de l'analyse. Veuillez réessayer."
      };

      return new Response(
        JSON.stringify(errorResponse),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } finally {
      clearTimeout(timeout);
    }

  } catch (error) {
    console.error("Erreur générale:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur serveur",
        analysis: "Une erreur inattendue est survenue. Veuillez réessayer."
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});