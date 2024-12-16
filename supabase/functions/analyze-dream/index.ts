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

    const prompt = `En tant que coach professionnel spécialisé dans l'analyse des rêves professionnels, analyse ce rêve et fournis une réponse détaillée :

${dream}

Format de réponse souhaité :

ANALYSE DU RÊVE :
[Fournis une analyse approfondie des éléments clés du rêve professionnel, en identifiant les aspirations et les défis potentiels]

POINTS FORTS IDENTIFIÉS :
• [Premier point fort identifié dans le rêve]
• [Deuxième point fort identifié]
• [Troisième point fort identifié]

OBSTACLES POTENTIELS :
• [Premier obstacle potentiel]
• [Deuxième obstacle potentiel]
• [Troisième obstacle potentiel]

CONSEILS PRATIQUES POUR LA RÉALISATION :
1. [Premier conseil détaillé et actionnable]
2. [Deuxième conseil détaillé et actionnable]
3. [Troisième conseil détaillé et actionnable]

PROCHAINES ÉTAPES RECOMMANDÉES :
1. [Première étape concrète à mettre en place]
2. [Deuxième étape concrète]
3. [Troisième étape concrète]`;

    console.log("Envoi de la requête à l'API Hugging Face avec le prompt :", prompt);

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
            max_length: 1000,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      console.error('Erreur API Hugging Face:', await response.text());
      throw new Error("Échec de l'analyse du rêve");
    }

    const result = await response.json();
    const analysis = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    console.log("Réponse reçue de l'API :", analysis);

    return new Response(
      JSON.stringify({ 
        analysis: analysis || "Désolé, je n'ai pas pu analyser ce rêve correctement. Veuillez réessayer." 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur dans la fonction analyze-dream:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});