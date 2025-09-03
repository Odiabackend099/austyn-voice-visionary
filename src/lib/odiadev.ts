const BRIDGE = import.meta.env.VITE_BRIDGE_URL as string;

function b64ToBlobUrl(base64: string, mime = "audio/mpeg"): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: mime }));
}

export async function speak(text: string, voice_id: string, tone="neutral", speed=1.0): Promise<string> {
  const r = await fetch(`${BRIDGE}/tts/speak`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text, voice_id, tone, speed, format: "mp3" })
  });
  if (!r.ok) throw new Error(`TTS failed (${r.status})`);
  return URL.createObjectURL(await r.blob());
}

type ChatIn = { channel: "web"; business: string; user_id: string; text: string; voice_id: string };
type ChatOut = { reply: string; tts?: { mime: string; base64: string } };

export async function chat(input: ChatIn): Promise<{ reply: string; audioUrl?: string }> {
  const r = await fetch(`${BRIDGE}/agent/ingest`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!r.ok) throw new Error(`Agent failed (${r.status})`);
  const data = (await r.json()) as ChatOut;
  const audioUrl = data.tts?.base64 ? b64ToBlobUrl(data.tts.base64, data.tts.mime || "audio/mpeg") : undefined;
  return { reply: data.reply, audioUrl };
}