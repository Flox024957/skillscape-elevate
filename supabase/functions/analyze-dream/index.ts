import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";

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
        JSON.stringify({ error: 'Dream text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      return new Response(
        JSON.stringify({ error: 'Perplexity API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a professional career coach. Be precise and concise.'
          },
          {
            role: 'user',
            content: `En tant que coach professionnel, analyse ce rêve et donne des conseils pratiques pour sa réalisation : ${dream}

Format de réponse souhaité :
• Premier conseil pratique
• Deuxième conseil pratique
• Troisième conseil pratique`
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', await response.text());
      throw new Error('Failed to analyze dream');
    }

    const result = await response.json();
    const analysis = result.choices[0]?.message?.content || "Désolé, je n'ai pas pu analyser ce rêve.";

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-dream function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});