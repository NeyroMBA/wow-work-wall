import { useEffect, useRef, useState, useMemo } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

// Build a richer set by repeating dashboards to fill the cylinder
const buildTiles = () => {
  const out: Dashboard[] = [];
  for (let i = 0; i < 4; i++) {
    out.push(...dashboards);
  }
  return out;
};

const V4Wall = ({ onSelect }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const tiles = useMemo(() => buildTiles(), []);
  const COLS = 12;        // tiles per ring
  const ROWS = 3;         // vertical rings
  const RADIUS = 720;     // px
  const ROW_GAP = 230;    // px between rings
  const ANGLE_STEP = 360 / COLS;

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // wall rotation around Y, tilted slightly. Also small orbit on X.
  const rotY = -progress * 360;       // full revolution across the section
  const tiltX = -8 + progress * 4;    // gentle tilt change

  // info panel index follows the front tile
  const frontIndex = Math.round(((-rotY % 360 + 360) % 360) / ANGLE_STEP) % COLS;
  const featured = tiles[frontIndex] ?? tiles[0];

  return (
    <section ref={ref} id="wall" className="relative" style={{ height: "500vh" }}>
      <div className="v4-stage">
        {/* aurora glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(40% 50% at 50% 50%, hsl(260 85% 75% / 0.18), transparent 70%)",
          }}
        />

        <div
          className="v4-wall"
          style={{
            transform: `translateZ(-${RADIUS}px) rotateX(${tiltX}deg) rotateY(${rotY}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          {Array.from({ length: ROWS }).map((_, row) => {
            const yOffset = (row - (ROWS - 1) / 2) * ROW_GAP;
            const rowAngleOffset = row % 2 === 0 ? 0 : ANGLE_STEP / 2;

            return Array.from({ length: COLS }).map((_, col) => {
              const i = row * COLS + col;
              const tile = tiles[i % tiles.length];
              const angle = col * ANGLE_STEP + rowAngleOffset;

              return (
                <div
                  key={`${row}-${col}`}
                  className="v4-tile"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px) rotateY(0deg)`,
                  }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect(tile)}
                >
                  <img src={tile.image} alt={tile.title} loading="lazy" />
                  <div className="v4-tile-meta">
                    <span>№ {String((i % tiles.length) + 1).padStart(3, "0")}</span>
                    <span>{tile.category}</span>
                  </div>
                </div>
              );
            });
          })}
        </div>

        {/* HUD overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* corners */}
          <div className="absolute top-6 left-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim">
            wall · 240 works
          </div>
          <div className="absolute top-6 right-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-mint">
            {Math.round(progress * 100)}% · rotation {Math.round(-rotY)}°
          </div>

          {/* center crosshair */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[220px] border border-dashed rounded-[14px]"
                 style={{ borderColor: "hsl(40 30% 96% / 0.18)" }} />
          </div>

          {/* featured info */}
          <div className="absolute left-8 bottom-8 max-w-md v4-glass p-5 pointer-events-auto">
            <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-2 flex items-center gap-2">
              <span className="v4-chip-dot" /> в фокусе
            </div>
            <div className="v4-serif text-3xl leading-tight mb-1">{featured.title}</div>
            <div className="v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim mb-3">
              {featured.author} · {featured.cohort}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(40 30% 88%)" }}>
              {featured.description}
            </p>
            <button
              onClick={() => onSelect(featured)}
              className="mt-4 v4-mono text-[11px] uppercase tracking-[0.22em] v4-mint v4-link"
            >
              открыть работу →
            </button>
          </div>

          {/* scroll hint */}
          <div className="absolute right-8 bottom-8 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim text-right">
            <div>скролл = поворот</div>
            <div className="v4-mint mt-1">
              {hover !== null ? "клик — открыть карточку" : "наведи на работу"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V4Wall;
