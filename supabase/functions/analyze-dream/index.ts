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
    const { dream } = await req.json();

    if (!dream) {
      return new Response(
        JSON.stringify({ error: 'Le texte du rêve est requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const HF_TOKEN = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!HF_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Clé API Hugging Face non configurée' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `Analyse ce rêve professionnel et donne des conseils pratiques pour le réaliser :

${dream}

Format de réponse attendu :

ANALYSE GLOBALE
[2-3 phrases d'analyse du rêve et de sa signification]

POINTS FORTS IDENTIFIÉS
• [Point fort 1]
• [Point fort 2]
• [Point fort 3]

DÉFIS À SURMONTER
• [Défi 1]
• [Défi 2]
• [Défi 3]

CONSEILS PRATIQUES
1. [Conseil détaillé 1]
2. [Conseil détaillé 2]
3. [Conseil détaillé 3]

ACTIONS À METTRE EN PLACE
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]`;

    console.log("Envoi de la requête à Qwen2...");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Qwen/Qwen1.5-72B-Chat",
        {
          headers: { 
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 800,
              temperature: 0.7,
              top_p: 0.95,
              return_full_text: false,
              truncate: 1000
            }
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const result = await response.json();
      let analysis = Array.isArray(result) ? result[0].generated_text : result.generated_text;

      if (!analysis || typeof analysis !== 'string') {
        throw new Error("Réponse invalide");
      }

      // Vérification basique de la structure
      if (!analysis.includes('ANALYSE') || !analysis.includes('POINTS FORTS')) {
        analysis = "Je n'ai pas pu analyser ce rêve correctement. Veuillez réessayer avec plus de détails.";
      }

      console.log("Réponse reçue de Qwen2:", analysis);

      return new Response(
        JSON.stringify({ analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error("Délai d'attente dépassé");
      }
      throw fetchError;
    } finally {
      clearTimeout(timeout);
    }

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        analysis: "Une erreur est survenue. Veuillez réessayer." 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});