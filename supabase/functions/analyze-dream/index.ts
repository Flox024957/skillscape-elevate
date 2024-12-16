import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { generateDreamAnalysisPrompt, getFallbackTemplate } from "./prompts.ts";
import { queryHuggingFace } from "./huggingface.ts";
import { DreamAnalysisResponse } from "./types.ts";

const TIMEOUT_DURATION = 30000; // 30 secondes

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

      // Validation basique de la structure de la réponse
      const finalAnalysis = analysis.includes('ANALYSE APPROFONDIE') 
        ? analysis 
        : getFallbackTemplate();

      console.log("Analyse terminée avec succès");
      
      const response: DreamAnalysisResponse = {
        analysis: finalAnalysis
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
          : `Erreur API: ${apiError.status || 500}`,
        analysis: "Une erreur est survenue. Veuillez réessayer dans quelques instants."
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
        analysis: "Une erreur inattendue est survenue."
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});