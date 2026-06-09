import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getMask, pickPaletteForCategory } from "@/lib/wall-data";
import wallTexture from "@/assets/wall/wall-texture.jpg";

interface WallMessage {
  id: string;
  mask: string;
  category: string;
  mood: string;
  content: string;
  created_at: string;
}

export interface WallSpray {
  id: string;
  dataUrl: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
}

function hashTo(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % mod;
}

interface LiveWallProps {
  refreshKey: number;
  sprays: WallSpray[];
}

export function LiveWall({ refreshKey, sprays }: LiveWallProps) {
  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("wall_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(24);
      if (!alive) return;
      if (error) console.error("[wall] load error", error);
      setMessages((data ?? []) as WallMessage[]);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  return (
    <section
      id="wall"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, hsl(var(--background)) 70%, transparent), color-mix(in oklab, hsl(var(--background)) 85%, transparent)), url(${wallTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {sprays.map((s) => (
          <img
            key={s.id}
            src={s.dataUrl}
            alt=""
            className="absolute select-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${28 * s.scale}%`,
              transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
              opacity: 0.45,
              mixBlendMode: "screen",
              filter: "blur(0.3px)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <h2 className="font-display text-4xl sm:text-6xl uppercase leading-[1]">
            стена{" "}
            <span
              className="font-graffiti normal-case"
              style={{
                color: "var(--neon-green)",
                textShadow: "0 0 18px var(--neon-green), 2px 2px 0 rgba(0,0,0,0.6)",
              }}
            >
              ночного офиса
            </span>
          </h2>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {loading ? "сканирую стену..." : `${messages.length} надписей сейчас`}
          </div>
        </div>

        {messages.length === 0 && !loading && (
          <div className="text-center py-20 text-muted-foreground">
            стена пока чистая. будь первым.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {messages.map((m, i) => (
            <div key={m.id} className="relative min-h-[180px] overflow-hidden">
              <WallCard m={m} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WallCard({ m, index, falling, onPeel }: { m: WallMessage; index: number; falling: boolean; onPeel: () => void }) {
  const mask = getMask(m.mask);
  const color = mask?.color ?? pickPaletteForCategory(m.category);
  const rotWall = useMemo(() => (hashTo(m.id, 100) - 50) / 14, [m.id]);
  const rotSticker = useMemo(() => (hashTo(m.id, 60) - 30) / 14, [m.id]);
  const skewDeg = useMemo(() => (hashTo(m.id + ":s", 60) - 30) / 24, [m.id]);
  const letterSpacing = useMemo(() => `${(hashTo(m.id + ":ls", 6) - 2) * 0.015}em`, [m.id]);
  const variant = hashTo(m.id + ":v", 7);
  const mode: "sticker" | "graffiti" | "marker" =
    variant <= 1 ? "graffiti" : variant === 2 ? "marker" : "sticker";

  if (mode === "graffiti") {
    const big = hashTo(m.id + ":sz", 2) === 0;
    return (
      <article
        className="drift-in relative px-2 py-4"
        style={{
          transform: `rotate(${rotWall}deg) skewX(${skewDeg}deg)`,
          animationDelay: `${index * 50}ms`,
          letterSpacing,
        }}
      >
        <p
          className="font-graffiti leading-[1.05] break-words"
          style={{
            fontSize: big ? "clamp(1.5rem, 2.8vw, 2.25rem)" : "clamp(1.25rem, 2.2vw, 1.75rem)",
            color,
            textShadow: `0 0 14px ${color}, 2px 3px 0 rgba(0,0,0,0.55)`,
            fontWeight: big ? 700 : 500,
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {m.content}
        </p>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span style={{ color }}>{mask?.emoji} {mask?.name ?? m.mask}</span>
          <span>·</span>
          <span>{m.category}</span>
          <span>·</span>
          <span>{timeAgo(m.created_at)}</span>
        </div>
      </article>
    );
  }

  if (mode === "marker") {
    return (
      <article
        className="drift-in relative px-3 py-4"
        style={{
          transform: `rotate(${rotWall * 0.7}deg) skewY(${skewDeg * 0.4}deg)`,
          animationDelay: `${index * 50}ms`,
          letterSpacing,
        }}
      >
        <p
          className="font-graffiti text-xl sm:text-2xl leading-snug break-words"
          style={{
            color: "#f0f0f5",
            textShadow: `1px 1px 0 rgba(0,0,0,0.6), 0 0 8px color-mix(in oklab, ${color} 60%, transparent)`,
            fontStyle: hashTo(m.id + ":i", 2) === 0 ? "italic" : "normal",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {m.content}
        </p>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span style={{ color }}>{mask?.emoji} {mask?.name ?? m.mask}</span>
          <span>·</span>
          <span>{m.mood}</span>
          <span>·</span>
          <span>{timeAgo(m.created_at)}</span>
        </div>
      </article>
    );
  }

  const fallRot = (hashTo(m.id + ":f", 60) - 30);
  return (
    <article
      className="sticker drift-in cursor-pointer select-none"
      onClick={onPeel}
      title="оторвать"
      style={{
        transform: falling
          ? `translateY(120vh) rotate(${fallRot * 4}deg)`
          : `rotate(${rotSticker}deg)`,
        animationDelay: `${index * 50}ms`,
        borderColor: `color-mix(in oklab, ${color} 35%, hsl(var(--border)))`,
        transition: falling
          ? "transform 1s cubic-bezier(0.55, 0.06, 0.68, 0.19), opacity 1s ease-in"
          : "transform 0.25s ease",
        opacity: falling ? 0 : 1,
        willChange: "transform",
      }}
    >
      <header className="flex items-center justify-between mb-3">
        <span className="font-display text-sm tracking-widest uppercase" style={{ color, textShadow: `0 0 12px ${color}` }}>
          {mask?.emoji} {mask?.name ?? m.mask}
        </span>
        <span className="text-lg" title={m.mood}>{m.mood}</span>
      </header>
      <p className="text-sm leading-relaxed text-foreground/90">{m.content}</p>
      <footer className="mt-4 flex items-center justify-between">
        <span className="tag-chip" style={{ color, borderColor: `color-mix(in oklab, ${color} 50%, transparent)` }}>
          {m.category}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{timeAgo(m.created_at)}</span>
      </footer>
    </article>
  );
}

function timeAgo(iso: string) {
  const t = Date.now() - new Date(iso).getTime();
  const m = Math.floor(t / 60000);
  if (m < 1) return "только что";
  if (m < 60) return `${m}м назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}ч назад`;
  return `${Math.floor(h / 24)}д назад`;
}
