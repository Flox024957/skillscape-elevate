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

    const prompt = `En tant qu'expert en développement professionnel et personnel, analyse en détail le rêve professionnel suivant et fournis une analyse approfondie avec des conseils concrets pour sa réalisation :

${dream}

Format de réponse souhaité :

ANALYSE APPROFONDIE :
[Analyse détaillée du rêve, sa signification profonde, et son alignement avec les aspirations professionnelles de la personne]

POINTS FORTS IDENTIFIÉS :
1. [Point fort majeur 1 avec explication]
2. [Point fort majeur 2 avec explication]
3. [Point fort majeur 3 avec explication]
4. [Point fort majeur 4 avec explication]

DÉFIS À SURMONTER :
1. [Défi principal 1 et comment l'aborder]
2. [Défi principal 2 et comment l'aborder]
3. [Défi principal 3 et comment l'aborder]

PLAN D'ACTION DÉTAILLÉ :
Court terme (0-6 mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

Moyen terme (6-18 mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

Long terme (18+ mois) :
1. [Action concrète 1]
2. [Action concrète 2]
3. [Action concrète 3]

RESSOURCES RECOMMANDÉES :
1. [Ressource spécifique 1]
2. [Ressource spécifique 2]
3. [Ressource spécifique 3]
4. [Ressource spécifique 4]

CONSEILS DE DÉVELOPPEMENT PERSONNEL :
[Conseils personnalisés pour le développement personnel nécessaire à la réalisation de ce rêve]`;

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
              max_new_tokens: 1000,  // Increased for longer responses
              temperature: 0.7,
              top_p: 0.9,
              top_k: 40,
              repetition_penalty: 1.2,
              return_full_text: false,
              wait_for_model: true
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
      if (!analysis.includes('ANALYSE APPROFONDIE') || !analysis.includes('POINTS FORTS')) {
        console.log("Restructuration de la réponse...");
        analysis = `ANALYSE APPROFONDIE :
${analysis}

POINTS FORTS IDENTIFIÉS :
1. Point à développer
2. Point à développer
3. Point à développer
4. Point à développer

DÉFIS À SURMONTER :
1. Défi à identifier
2. Défi à identifier
3. Défi à identifier

PLAN D'ACTION DÉTAILLÉ :
Court terme (0-6 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

Moyen terme (6-18 mois) :
1. Action à définir
2. Action à définir
3. Action à définir

Long terme (18+ mois) :
1. Action à définir
2. Action à définir
3. Action à définir

RESSOURCES RECOMMANDÉES :
1. Ressource à identifier
2. Ressource à identifier
3. Ressource à identifier
4. Ressource à identifier

CONSEILS DE DÉVELOPPEMENT PERSONNEL :
Conseils à développer`;
      }

      console.log("Réponse finale:", analysis);

      return new Response(
        JSON.stringify({ analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (apiError) {
      console.error("Erreur API:", apiError);
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