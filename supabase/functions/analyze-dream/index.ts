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

    const prompt = `En tant que coach professionnel, analyse ce rêve professionnel et fournis une réponse détaillée et structurée :

${dream}

Réponds en suivant EXACTEMENT ce format :

ANALYSE DU RÊVE
[Une analyse détaillée du rêve professionnel en 3-4 phrases]

POINTS FORTS IDENTIFIÉS
• [Premier point fort]
• [Deuxième point fort]
• [Troisième point fort]

OBSTACLES POTENTIELS
• [Premier obstacle]
• [Deuxième obstacle]
• [Troisième obstacle]

CONSEILS PRATIQUES
1. [Premier conseil actionnable]
2. [Deuxième conseil actionnable]
3. [Troisième conseil actionnable]

PROCHAINES ÉTAPES
1. [Première étape concrète]
2. [Deuxième étape concrète]
3. [Troisième étape concrète]`;

    console.log("Envoi de la requête à l'API avec le prompt :", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/bigscience/bloom",
      {
        headers: { 
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false,
            truncate: 1000
          }
        }),
      }
    );

    if (!response.ok) {
      console.error('Erreur API Hugging Face:', await response.text());
      throw new Error("Échec de l'analyse du rêve");
    }

    const result = await response.json();
    let analysis = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    // Vérification et nettoyage de la réponse
    if (!analysis || typeof analysis !== 'string') {
      throw new Error("Réponse invalide de l'API");
    }

    // S'assurer que la réponse est bien structurée
    if (!analysis.includes('ANALYSE DU RÊVE') || !analysis.includes('POINTS FORTS')) {
      analysis = `ANALYSE INCOMPLÈTE\n\nDésolé, je n'ai pas pu analyser ce rêve correctement. Veuillez réessayer avec une description plus détaillée.`;
    }

    console.log("Réponse finale formatée :", analysis);

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur dans la fonction analyze-dream:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        analysis: "Une erreur est survenue lors de l'analyse. Veuillez réessayer." 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});