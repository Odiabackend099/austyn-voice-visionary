// Adaqua AI TTS integration service using ODIADEV API
import { supabase } from '@/integrations/supabase/client';
import { speak } from '@/lib/odiadev';

const DEFAULT_VOICE_ID = 'naija_female_warm';
let audioCtx: AudioContext | null = null;

/**
 * Initialize or resume the AudioContext. Call this on a user interaction to unlock audio playback.
 */
export function initAudio(): void {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      console.log('AudioContext resumed');
    }).catch(err => {
      console.warn('AudioContext resume failed:', err);
    });
  }
}

/**
 * Play text as speech using ODIADEV TTS API
 */
export async function speakText(text: string, voice_id: string = DEFAULT_VOICE_ID): Promise<void> {
  if (!text) return;
  
  try {
    const audioUrl = await speak(text, voice_id);
    const audio = new Audio(audioUrl);
    audio.crossOrigin = "anonymous";
    
    await audio.play();
    
    audio.onended = () => console.log('TTS playback ended');
    audio.onerror = (e) => {
      console.error('Audio playback error', e);
      playErrorBeep();
    };
  } catch (err) {
    console.error('speakText() failed:', err);
    playErrorBeep();
  }
}

/**
 * Send a user message to Adaqua AI and get the response (without auto-speaking)
 */
export async function askAdaquaAI(userMessage: string): Promise<string> {
  if (!userMessage) return '';
  
  try {
    console.log('Sending message to Adaqua AI:', userMessage);
    
    // Call Adaqua AI via Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('odia-agent', {
      body: { message: userMessage }
    });
    
    if (error) {
      console.error('Adaqua AI error:', error);
      return `Hello! I'm Adaqua AI, your voice-first assistant. I'm experiencing some technical difficulties right now, but I'm here to help you with AI automation and voice technology solutions for your business.`;
    }
    
    return data?.reply || `Hello! I'm Adaqua AI. You said: "${userMessage}". How can I help you with AI automation today?`;
  } catch (err) {
    console.error('askAdaquaAI: Agent request failed', err);
    return `Hello! I'm Adaqua AI, your voice-first assistant for Nigeria. I'm experiencing some connectivity issues, but I'm here to help you with AI automation and voice technology solutions.`;
  }
}

/**
 * Send a user message to Adaqua AI and speak the agent's response.
 */
export async function askAgentAndSpeak(userMessage: string): Promise<string> {
  const replyText = await askAdaquaAI(userMessage);
  
  // Speak the reply
  if (replyText) {
    await speakText(replyText);
  }
  
  return replyText;
}

/**
 * Internal: play a short "beep" as a fallback if TTS audio fails.
 */
function playErrorBeep(): void {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = 440;
    gain.gain.value = 0.2;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    console.warn('Error playing fallback beep:', e);
  }
}