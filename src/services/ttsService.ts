// ODIA TTS integration service
const TTS_SERVER_URL = 'https://odia-tts.onrender.com';
const OPENAI_API_KEY = ''; // Your OpenAI API key if using the agent endpoint

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
    if (OPENAI_API_KEY) {
      const res = await fetch(`${TTS_SERVER_URL}/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, apiKey: OPENAI_API_KEY })
      });
      const data = await res.json();
      replyText = data.reply || data.text || '';
    } else {
      // No API key provided – just echo the user message
      replyText = userMessage;
    }
  } catch (err) {
    console.error('askAgentAndSpeak: Agent request failed, falling back to echo.', err);
    replyText = userMessage;
  }
  
  // Speak the reply (or echoed message)
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