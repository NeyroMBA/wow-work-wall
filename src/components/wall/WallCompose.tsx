import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, type Mask } from "@/lib/wall-data";
import { toast } from "sonner";

const COLORS = [
  "var(--neon-green)",
  "var(--neon-pink)",
  "var(--neon-cyan)",
  "var(--neon-violet)",
  "var(--neon-yellow)",
];

const EMOJIS = ["🔥", "💀", "👁", "✨", "💣", "🌙", "⚡️", "🖤", "🤡", "😤", "💡", "❓", "🫥", "🩸", "🕶", "🎧"];

const schema = z.object({
  mask: z.string().min(1),
  category: z.string().min(1),
  mood: z.string().min(1),
  content: z.string().trim().min(1).max(2000),
});

interface WallComposeProps {
  mask: Mask;
  onSent: () => void;
  onSubmitToWall?: (dataUrl: string) => void;
}

export function WallCompose({ mask, onSent, onSubmitToWall }: WallComposeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(18);
  const [mode, setMode] = useState<"text" | "draw">("text");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      const ctx = c.getContext("2d");
      ctx?.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const resolveColor = (cssVar: string) => {
    const name = cssVar.replace("var(", "").replace(")", "").trim();
    const el = document.querySelector(".wall-root") ?? document.documentElement;
    return getComputedStyle(el).getPropertyValue(name).trim();
  };

  const spray = (x: number, y: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const real = resolveColor(color);
    ctx.fillStyle = real || "white";
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
      ctx.globalAlpha = Math.random() * 0.4 + 0.1;
      ctx.beginPath();
      ctx.arc(x + dx, y + dy, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    dirty.current = true;
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const clearAll = () => {
    const c = canvasRef.current;
    if (c) {
      const ctx = c.getContext("2d");
      ctx?.clearRect(0, 0, c.width, c.height);
      dirty.current = false;
    }
    setContent("");
    setCategory("");
    setSent(false);
  };

  const send = async () => {
    const hasDrawing = dirty.current;
    const hasText = content.trim().length > 0;
    if (!hasDrawing && !hasText) {
      toast.error("Нарисуй или напиши хоть что-нибудь.");
      return;
    }

    setSending(true);

    if (hasDrawing) {
      const c = canvasRef.current;
      if (c && onSubmitToWall) {
        const dataUrl = c.toDataURL("image/png");
        onSubmitToWall(dataUrl);
      }
    }

    if (hasText) {
      const parsed = schema.safeParse({
        mask: mask.id,
        category: category || "Другое",
        mood: "🌙",
        content,
      });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Проверь поле");
        setSending(false);
        return;
      }
      const { error } = await supabase.from("wall_messages").insert(parsed.data);
      if (error) {
        toast.error("Не получилось отправить. Попробуй ещё раз.");
        setSending(false);
        return;
      }
      onSent();
    }

    setSending(false);
    setSent(true);
    setTimeout(() => {
      const c = canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        ctx?.clearRect(0, 0, c.width, c.height);
        dirty.current = false;
      }
      setContent("");
      setCategory("");
    }, 300);
    setTimeout(() => setSent(false), 1800);
    toast.success("Ты оставил след на стене.");
  };

  const insertEmoji = (e: string) => {
    setContent((prev) => prev + e);
    setEmojiOpen(false);
    setMode("text");
  };

  return (
    <section id="compose" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase">
              что напишешь{" "}
              <span className="text-glow-pink" style={{ color: "var(--neon-pink)" }}>
                на стене?
              </span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Напиши или нарисуй — анонимно. Останется на стене как настоящее граффити.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-md border bg-card">
            <button
              onClick={() => setMode("text")}
              className="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-widest transition"
              style={{
                background: mode === "text" ? "var(--neon-green)" : "transparent",
                color: mode === "text" ? "hsl(var(--background))" : "var(--color-foreground)",
              }}
            >
              ✎ текст
            </button>
            <button
              onClick={() => setMode("draw")}
              className="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-widest transition"
              style={{
                background: mode === "draw" ? "var(--neon-pink)" : "transparent",
                color: mode === "draw" ? "hsl(var(--background))" : "var(--color-foreground)",
              }}
            >
              ✷ рисунок
            </button>
          </div>
        </div>

        <div
          className="relative rounded-lg border-2 overflow-hidden wall-surface"
          style={{ borderColor: "color-mix(in oklab, var(--neon-green) 35%, hsl(var(--border)))" }}
        >
          <div className="absolute top-3 left-3 z-20 tag-chip"
               style={{ color: mask.color, borderColor: mask.color, background: "hsl(var(--background))" }}>
            <span>{mask.emoji}</span> {mask.name}
          </div>

          <canvas
            ref={canvasRef}
            className={`block w-full h-[420px] touch-none ${mode === "draw" ? "spray-can-cursor" : ""}`}
            style={{ pointerEvents: mode === "draw" ? "auto" : "none" }}
            onPointerDown={(e) => {
              if (mode !== "draw") return;
              drawing.current = true;
              const p = getPos(e);
              spray(p.x, p.y);
            }}
            onPointerMove={(e) => {
              if (!drawing.current) return;
              const p = getPos(e);
              spray(p.x, p.y);
            }}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
            placeholder={mode === "text" ? "напиши то, что обычно не говоришь вслух..." : ""}
            className="absolute inset-0 w-full h-full resize-none bg-transparent p-6 pt-14 font-mono text-base leading-relaxed outline-none"
            style={{
              pointerEvents: mode === "text" ? "auto" : "none",
              color: "hsl(var(--foreground))",
              caretColor: "var(--neon-green)",
            }}
          />

          {category && (
            <div className="absolute bottom-3 left-3 z-20 tag-chip"
                 style={{ color: "var(--neon-cyan)", borderColor: "var(--neon-cyan)", background: "hsl(var(--background))" }}>
              # {category}
            </div>
          )}

          <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {content.length} / 2000
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 flex-wrap relative">
          <div className="flex items-end gap-2 p-2 rounded-md border bg-card">
            {COLORS.map((c) => (
              <SprayCanButton
                key={c}
                color={c}
                active={color === c}
                onClick={() => { setColor(c); setMode("draw"); }}
              />
            ))}
          </div>

          <input
            type="range"
            min={6}
            max={40}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />

          <button onClick={clearAll} className="btn-ghost-neon text-xs">очистить</button>

          <button
            onClick={send}
            disabled={sending}
            className="btn-ghost-neon text-xs disabled:opacity-50"
            style={{
              color: "var(--neon-green)",
              borderColor: "color-mix(in oklab, var(--neon-green) 60%, transparent)",
              boxShadow: sent ? "0 0 16px var(--neon-green)" : undefined,
            }}
          >
            {sent ? "отправлено →" : sending ? "распыляю..." : "отправить на стену"}
          </button>

          <div className="relative">
            <button
              onClick={() => { setEmojiOpen((v) => !v); setTagOpen(false); }}
              className="btn-ghost-neon text-xs"
              aria-label="эмоджи"
            >
              😶 эмоджи
            </button>
            {emojiOpen && (
              <div className="absolute z-30 bottom-full mb-2 left-0 p-3 rounded-md border bg-card shadow-xl grid grid-cols-8 gap-1 min-w-[260px]">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => insertEmoji(e)}
                    className="text-xl p-1 rounded hover:bg-background/80 transition"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setTagOpen((v) => !v); setEmojiOpen(false); }}
              className="btn-ghost-neon text-xs"
              aria-label="тег"
              style={{
                color: category ? "var(--neon-cyan)" : undefined,
                borderColor: category ? "var(--neon-cyan)" : undefined,
              }}
            >
              # тег{category ? ` · ${category.slice(0, 14)}${category.length > 14 ? "…" : ""}` : ""}
            </button>
            {tagOpen && (
              <div className="absolute z-30 bottom-full mb-2 left-0 p-3 rounded-md border bg-card shadow-xl max-h-[300px] overflow-y-auto w-[280px]">
                <button
                  onClick={() => { setCategory(""); setTagOpen(false); }}
                  className="block w-full text-left px-2 py-1.5 text-xs font-mono text-muted-foreground hover:bg-background/80 rounded"
                >
                  — без тега —
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setTagOpen(false); }}
                    className="block w-full text-left px-2 py-1.5 text-xs hover:bg-background/80 rounded"
                    style={{ color: category === c ? "var(--neon-cyan)" : undefined }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SprayCanButton({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={color}
      className="group relative flex flex-col items-center transition-transform hover:-translate-y-0.5"
      style={{ filter: active ? `drop-shadow(0 0 10px ${color})` : undefined }}
    >
      <span className="block w-2.5 h-1.5 rounded-sm" style={{ background: "#404040" }} />
      <span className="block w-4 h-2 rounded-t-sm -mt-px" style={{ background: "#2b2b2b" }} />
      <span
        className="relative block w-6 h-9 rounded-sm overflow-hidden border"
        style={{
          background: "linear-gradient(180deg, #cfcfd6 0%, #9a9aa3 60%, #6a6a73 100%)",
          borderColor: active ? "hsl(var(--foreground))" : "#494952",
        }}
      >
        <span
          className="absolute inset-x-0 top-1/3 h-1/3 block"
          style={{
            background: color,
            boxShadow: `inset 0 0 6px color-mix(in oklab, ${color} 60%, black)`,
          }}
        />
        <span
          className="absolute left-0.5 top-0.5 bottom-0.5 w-0.5 rounded-sm opacity-60"
          style={{ background: "white" }}
        />
      </span>
    </button>
  );
}
