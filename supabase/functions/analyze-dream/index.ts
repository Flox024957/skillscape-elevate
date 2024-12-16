import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const HF_TOKEN = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!HF_TOKEN) {
      console.error('Hugging Face API key not configured');
      return new Response(
        JSON.stringify({ error: 'Configuration API manquante' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { dream } = await req.json();
    if (!dream || typeof dream !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Contenu du rêve invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `Analyse le rêve professionnel suivant et fournis une analyse détaillée :

${dream}

Format de réponse souhaité :

ANALYSE :
[Analyse détaillée du rêve et de sa signification professionnelle]

POINTS FORTS :
1. [Point fort 1]
2. [Point fort 2]
3. [Point fort 3]

ACTIONS CONCRÈTES :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]`;

    console.log("Envoi de la requête à GPT-2...");
    console.log("Token HF présent:", !!HF_TOKEN);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/distributed/optimized-gpt2-2b",
      {
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 800,
            temperature: 0.7,
            top_p: 0.95,
            top_k: 50,
            repetition_penalty: 1.1,
            return_full_text: false
          }
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Hugging Face API error: ${response.status}`);
      throw new Error(`Erreur API: ${response.status}`);
    }

    const result = await response.json();
    console.log("Réponse brute de l'API:", result);
    
    let analysis = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    if (!analysis || typeof analysis !== 'string') {
      console.error("Réponse invalide:", analysis);
      throw new Error("Réponse invalide");
    }

    // Vérification basique de la structure
    if (!analysis.includes('ANALYSE') || !analysis.includes('POINTS FORTS')) {
      console.error("Structure de réponse invalide");
      analysis = "Je n'ai pas pu analyser ce rêve correctement. Veuillez réessayer avec plus de détails.";
    }

    console.log("Réponse finale:", analysis);

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Erreur:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Une erreur est survenue",
        analysis: "Une erreur est survenue. Veuillez réessayer."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});