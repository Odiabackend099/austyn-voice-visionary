import { useEffect, useMemo, useRef, useState } from "react";
import { chat, speak } from "../lib/odiadev";
import "../styles/odiadev.css";

type Msg = { role: "user" | "assistant"; text: string; audioUrl?: string };

const VOICES = [
  { id: "naija_male_deep",   label: "Nigerian Male — Deep" },
  { id: "naija_male_warm",   label: "Nigerian Male — Warm" },
  { id: "naija_female_warm", label: "Nigerian Female — Warm" },
  { id: "naija_female_bold", label: "Nigerian Female — Bold" },
];

export default function OdiaFloatingChat({
  business = import.meta.env.VITE_DEFAULT_BUSINESS || "personal-profile",
  defaultVoice = import.meta.env.VITE_DEFAULT_VOICE_ID || "naija_female_warm",
  title = "ODIADEV — Live Chat + Voice"
}: {
  business?: string;
  defaultVoice?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [voice, setVoice] = useState<string>(defaultVoice);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Stable user id per browser
  const userId = useMemo(() => {
    let u = localStorage.getItem("odiadev_uid");
    if (!u) { u = crypto.randomUUID(); localStorage.setItem("odiadev_uid", u); }
    return u;
  }, []);

  // Trap focus when open (accessibility)
  useEffect(() => {
    function onEsc(e: KeyboardEvent){ if(e.key==="Escape") setOpen(false); }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  async function send() {
    const content = text.trim();
    if (!content || loading) return;
    setText("");
    setMsgs(m => [...m, { role: "user", text: content }]);
    setLoading(true);
    try {
      const { reply, audioUrl } = await chat({
        channel: "web",
        business,
        user_id: userId,
        text: content,
        voice_id: voice
      });

      let url = audioUrl;
      if (!url) url = await speak(reply, voice);

      setMsgs(m => [...m, { role: "assistant", text: reply, audioUrl: url }]);

      if (url && audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().catch(() => {});
      }
    } catch (e) {
      setMsgs(m => [...m, { role: "assistant", text: "Network is busy. Please try again." }]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        id="odiadev-launcher"
        aria-label="Open ODIADEV chat"
        onClick={() => setOpen(o => !o)}
        title="Chat with ODIADEV"
      >
        💬
      </button>

      {/* Panel */}
      <div id="odiadev-panel" className={open ? "open" : ""} ref={panelRef} role="dialog" aria-modal="true" aria-label="ODIADEV chat panel">
        <div className="odiadev-head">
          <span className="odiadev-dot" />
          <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
          <div style={{ marginLeft: "auto" }} />
          <button onClick={() => setOpen(false)} style={{ color: "#fff", background: "transparent", border: 0, fontSize: 18, cursor: "pointer" }} aria-label="Close">✕</button>
        </div>

        <div className="odiadev-body">
          <div className="odiadev-voices">
            <span style={{ fontSize: 12, color: "#334155" }}>Voice</span>
            <select value={voice} onChange={e => setVoice(e.target.value)}>
              {VOICES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </div>

          <div className="odiadev-msgs" id="odiadev-msgs">
            {msgs.map((m, i) => (
              <div key={i} className="odiadev-msg">
                <strong>{m.role === "user" ? "You" : "Assistant"}</strong>
                <div className={m.role === "assistant" ? "assistant" : ""} style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                {m.audioUrl && <audio ref={i === msgs.length - 1 ? audioRef : undefined} controls src={m.audioUrl} />}
              </div>
            ))}
          </div>

          <div className="odiadev-compose">
            <textarea
              className="odiadev-textarea"
              placeholder="Ask about services, portfolio, or bookings…"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button className="odiadev-send" onClick={send} disabled={loading}>{loading ? "…" : "Send"}</button>
          </div>
        </div>
      </div>
    </>
  );
}