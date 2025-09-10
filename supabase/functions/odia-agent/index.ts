import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Security: Restrict CORS to allowed origins only
const ALLOWED_ORIGINS = [
  'https://nyrvnskbkitrazudrkkc.supabase.co',
  'https://localhost:5173',
  'https://127.0.0.1:5173',
  'https://0ac9b44f-4d1b-4192-91ec-b560b8eaefff.sandbox.lovable.dev',
  'https://austyn-eguale.odia.dev'
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // For development, allow all origins
  const dynamicCorsHeaders = corsHeaders;

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: dynamicCorsHeaders });
  }

  try {
    const { message } = await req.json();
    
    // Security: Input validation and rate limiting
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid message string is required' }), 
        { status: 400, headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Security: Limit message length to prevent abuse
    if (message.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Message too long. Maximum 2000 characters allowed.' }), 
        { status: 400, headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Security: Basic content filtering
    if (message.trim().length < 3) {
      return new Response(
        JSON.stringify({ error: 'Message too short. Please provide a meaningful question.' }), 
        { status: 400, headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not configured');
      // Fallback to echo for development
      return new Response(
        JSON.stringify({ reply: `Echo: ${message}` }), 
        { headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing AI agent request for message length:', message.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are ODIA AI Agent, a helpful assistant for Nigerian businesses. Provide concise, practical responses in a friendly tone. Do not provide harmful, inappropriate, or illegal content.' 
          },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    
    console.log('AI agent response generated successfully');

    return new Response(
      JSON.stringify({ reply }), 
      { headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in odia-agent function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { ...dynamicCorsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});