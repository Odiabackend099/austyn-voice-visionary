// ODIA TTS integration service
import { supabase } from '@/integrations/supabase/client';

const TTS_SERVER_URL = 'https://odia-tts.onrender.com';

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
 * Play a given text as speech using the ODIA TTS server.
 */
export async function speakText(text: string): Promise<void> {
  if (!text) return;
  
  try {
    const audioUrl = `${TTS_SERVER_URL}/speak?text=${encodeURIComponent(text)}`;
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
 * Send a user message to the AI agent and speak the agent's response.
 */
export async function askAgentAndSpeak(userMessage: string): Promise<string> {
  if (!userMessage) return '';
  
  let replyText = '';
  
  try {
    // Call secure AI agent via Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('odia-agent', {
      body: { message: userMessage }
    });
    
    if (error) {
      console.error('AI agent error:', error);
      replyText = `Sorry, I'm having trouble processing your request right now.`;
    } else {
      replyText = data?.reply || `Echo: ${userMessage}`;
    }
  } catch (err) {
    console.error('askAgentAndSpeak: Agent request failed', err);
    replyText = `Sorry, I'm having trouble processing your request right now.`;
  }
  
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