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

    // Increased timeout to 30 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
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
              max_new_tokens: 500,  // Reduced from 800 to improve stability
              temperature: 0.8,     // Slightly increased for more focused outputs
              top_p: 0.9,          // Slightly reduced for more focused outputs
              top_k: 40,           // Reduced from 50 for more stability
              repetition_penalty: 1.2,
              return_full_text: false,
              wait_for_model: true  // Added to prevent timeouts
            }
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        console.error(`Hugging Face API error: ${response.status} - ${await response.text()}`);
        throw new Error(`Erreur API: ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse brute de l'API:", result);
      
      let analysis = Array.isArray(result) ? result[0].generated_text : result.generated_text;

      if (!analysis || typeof analysis !== 'string') {
        console.error("Réponse invalide:", analysis);
        throw new Error("Format de réponse invalide");
      }

      // Basic validation of the response structure
      if (!analysis.includes('ANALYSE') || !analysis.includes('POINTS FORTS')) {
        console.log("Restructuration de la réponse...");
        analysis = `ANALYSE :
${analysis}

POINTS FORTS :
1. Point à développer
2. Point à développer
3. Point à développer

ACTIONS CONCRÈTES :
1. Action à définir
2. Action à définir
3. Action à définir`;
      }

      console.log("Réponse finale:", analysis);

      return new Response(
        JSON.stringify({ analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (apiError) {
      console.error("Erreur API:", apiError);
      // If it's an abort error, return a specific message
      if (apiError.name === 'AbortError') {
        return new Response(
          JSON.stringify({ 
            error: "Le service a mis trop de temps à répondre", 
            analysis: "Le service est temporairement surchargé. Veuillez réessayer dans quelques instants." 
          }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw apiError;
    }

  } catch (error) {
    console.error("Erreur:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Une erreur est survenue",
        analysis: "Une erreur est survenue lors de l'analyse. Veuillez réessayer dans quelques instants."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});