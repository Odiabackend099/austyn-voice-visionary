import { supabase } from '@/integrations/supabase/client';

const TTS_API_URL = 'https://tts-api.odia.dev/v1/tts';
const DEFAULT_VOICE_ID = 'naija_female_warm';

/**
 * Speak text using ODIADEV TTS API
 */
export async function speak(text: string, voice_id: string = DEFAULT_VOICE_ID): Promise<string> {
  try {
    // Get API key from Supabase secrets
    const { data: secrets } = await supabase.functions.invoke('get-secrets', {
      body: { keys: ['ODIADEV_API_KEY'] }
    });
    
    const apiKey = secrets?.ODIADEV_API_KEY;
    if (!apiKey) {
      throw new Error('ODIADEV_API_KEY not found in secrets');
    }

    const response = await fetch(TTS_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        voice_id,
        format: 'mp3'
      })
    });

    if (!response.ok) {
      throw new Error(`TTS failed (${response.status})`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('TTS Error:', error);
    throw error;
  }
}

type ChatIn = { channel: "web"; business: string; user_id: string; text: string; voice_id: string };
type ChatOut = { reply: string; audioUrl?: string };

/**
 * Chat with Adaqua AI and get response with optional audio
 */
export async function chat(input: ChatIn): Promise<{ reply: string; audioUrl?: string }> {
  try {
    // Use Supabase edge function for AI chat
    const { data, error } = await supabase.functions.invoke('odia-agent', {
      body: { 
        message: input.text,
        business: input.business,
        user_id: input.user_id
      }
    });

    if (error) {
      throw new Error(`Agent failed: ${error.message}`);
    }

    const reply = data?.reply || `Echo: ${input.text}`;
    
    // Generate audio for the reply
    let audioUrl: string | undefined;
    try {
      audioUrl = await speak(reply, input.voice_id);
    } catch (ttsError) {
      console.warn('TTS generation failed:', ttsError);
      // Continue without audio if TTS fails
    }

    return { reply, audioUrl };
  } catch (error) {
    console.error('Chat Error:', error);
    throw error;
  }
}