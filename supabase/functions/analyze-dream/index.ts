import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0";

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

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    const prompt = `En tant que coach professionnel, analyse ce rêve et donne des conseils pratiques pour sa réalisation : ${dream}

Format de réponse souhaité :
• Premier conseil pratique
• Deuxième conseil pratique
• Troisième conseil pratique`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const analysis = completion.data.choices[0]?.text?.trim() || "Désolé, je n'ai pas pu analyser ce rêve.";

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});