import { supabase } from '@/integrations/supabase/client';

const TTS_API_URL = 'https://tts-api.odia.dev/v1/tts';
const DEFAULT_VOICE_ID = 'naija_female_warm';

/**
 * Speak text using OpenAI TTS API (fallback from ODIADEV)
 */
export async function speak(text: string, voice_id: string = 'alloy'): Promise<string> {
  try {
    // Try ODIADEV first
    try {
      const { data: secrets } = await supabase.functions.invoke('get-secrets', {
        body: { keys: ['ODIADEV_API_KEY'] }
      });
      
      const apiKey = secrets?.ODIADEV_API_KEY;
      if (apiKey) {
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

        if (response.ok) {
          const audioBlob = await response.blob();
          return URL.createObjectURL(audioBlob);
        }
      }
    } catch (odiaError) {
      console.warn('ODIADEV TTS failed, falling back to OpenAI:', odiaError);
    }

    // Fallback to OpenAI TTS
    const { data, error } = await supabase.functions.invoke('openai-tts', {
      body: { text, voice: voice_id }
    });

    if (error) {
      throw new Error(`OpenAI TTS failed: ${error.message}`);
    }

    // Convert base64 to audio blob
    const audioData = atob(data.audioContent);
    const audioArray = new Uint8Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      audioArray[i] = audioData.charCodeAt(i);
    }
    const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('All TTS methods failed:', error);
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