import { useEffect, useRef, useState, useMemo } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

const buildTiles = () => {
  const out: Dashboard[] = [];
  for (let i = 0; i < 4; i++) out.push(...dashboards);
  return out;
};

const COLS = 12;
const ROWS = 3;
const RADIUS = 720;
const ROW_GAP = 230;
const ANGLE_STEP = 360 / COLS;

const V4Wall = ({ onSelect }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);

  // featured updates rarely → cheap React state
  const [featuredCol, setFeaturedCol] = useState(0);
  const [progressDisplay, setProgressDisplay] = useState(0);

  const tiles = useMemo(() => buildTiles(), []);

  useEffect(() => {
    let raf = 0;
    let lastFeatured = -1;

    const tick = () => {
      const el = sectionRef.current;
      const wall = wallRef.current;
      if (!el || !wall) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      progressRef.current = p;

      const rotY = -p * 360;
      const tiltX = -8 + p * 4;
      wall.style.transform = `translateZ(-${RADIUS}px) rotateX(${tiltX}deg) rotateY(${rotY}deg)`;

      // Featured tile = the one whose angle puts it closest to camera (front, middle row)
      const front = ((Math.round(((-rotY) % 360 + 360) % 360 / ANGLE_STEP)) % COLS + COLS) % COLS;
      if (front !== lastFeatured) {
        // toggle highlight class on middle-row tile
        const prev = tileRefs.current[1 * COLS + lastFeatured];
        const next = tileRefs.current[1 * COLS + front];
        if (prev) prev.classList.remove("v4-tile--focus");
        if (next) next.classList.add("v4-tile--focus");
        lastFeatured = front;
        setFeaturedCol(front);
        setProgressDisplay(Math.round(p * 100));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const featured = tiles[1 * COLS + featuredCol] ?? tiles[0];

  return (
    <section ref={sectionRef} id="wall" className="relative" style={{ height: "500vh" }}>
      <div className="v4-stage">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(40% 50% at 50% 50%, hsl(260 85% 75% / 0.22), transparent 70%)",
          }}
        />

        <div ref={wallRef} className="v4-wall">
          {Array.from({ length: ROWS }).map((_, row) => {
            const yOffset = (row - (ROWS - 1) / 2) * ROW_GAP;
            const rowAngleOffset = row % 2 === 0 ? 0 : ANGLE_STEP / 2;

            return Array.from({ length: COLS }).map((_, col) => {
              const i = row * COLS + col;
              const tile = tiles[i % tiles.length];
              const angle = col * ANGLE_STEP + rowAngleOffset;
              const isMiddle = row === 1;

              return (
                <div
                  key={`${row}-${col}`}
                  ref={(n) => { tileRefs.current[i] = n; }}
                  className={`v4-tile ${isMiddle ? "v4-tile--target" : ""}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px)`,
                  }}
                  onClick={() => onSelect(tile)}
                >
                  <img src={tile.image} alt={tile.title} loading="lazy" decoding="async" />
                  <div className="v4-tile-meta">
                    <span>№ {String((i % tiles.length) + 1).padStart(3, "0")}</span>
                    <span>{tile.category}</span>
                  </div>
                  {isMiddle && (
                    <div className="v4-tile-badge">
                      <span className="v4-chip-dot" /> в фокусе
                    </div>
                  )}
                </div>
              );
            });
          })}
        </div>

        {/* HUD overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* center frame — that's where the focused tile lands */}
          <div className="v4-focus-frame">
            <span className="v4-focus-corner v4-focus-corner--tl" />
            <span className="v4-focus-corner v4-focus-corner--tr" />
            <span className="v4-focus-corner v4-focus-corner--bl" />
            <span className="v4-focus-corner v4-focus-corner--br" />
          </div>

          <div className="absolute top-6 left-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim">
            wall · {dashboards.length * ROWS * 4 / ROWS} works
          </div>
          <div className="absolute top-6 right-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-mint">
            {progressDisplay}% · в фокусе № {String(((featuredCol) % dashboards.length) + 1).padStart(3, "0")}
          </div>

          {/* connector line from frame to info card */}
          <svg className="v4-connector" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden>
            <path d="M 500 500 L 240 720 L 60 720" />
          </svg>

          {/* featured info */}
          <div className="absolute left-8 bottom-8 max-w-md v4-glass p-5 pointer-events-auto v4-info">
            <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-2 flex items-center gap-2">
              <span className="v4-chip-dot" /> сейчас смотрим
            </div>
            <div key={featured.id} className="v4-info-anim">
              <div className="v4-serif text-3xl leading-tight mb-1">{featured.title}</div>
              <div className="v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim mb-3">
                {featured.author} · {featured.cohort} · {featured.category}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(40 30% 88%)" }}>
                {featured.description}
              </p>
            </div>
            <button
              onClick={() => onSelect(featured)}
              className="mt-4 v4-mono text-[11px] uppercase tracking-[0.22em] v4-mint v4-link"
            >
              открыть работу →
            </button>
          </div>

          <div className="absolute right-8 bottom-8 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim text-right">
            <div>скролл = поворот стены</div>
            <div className="v4-mint mt-1">подсвеченная работа = в фокусе</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V4Wall;
