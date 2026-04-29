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
  const lastFocusRef = useRef<number>(-1);
  const hoverIdxRef = useRef<number | null>(null);

  const [focusIdx, setFocusIdx] = useState(0);
  const [progressDisplay, setProgressDisplay] = useState(0);

  const tiles = useMemo(() => buildTiles(), []);

  const applyFocus = (idx: number) => {
    if (idx === lastFocusRef.current) return;
    const prev = tileRefs.current[lastFocusRef.current];
    const next = tileRefs.current[idx];
    if (prev) prev.classList.remove("v4-tile--focus");
    if (next) next.classList.add("v4-tile--focus");
    lastFocusRef.current = idx;
    setFocusIdx(idx);
  };

  useEffect(() => {
    let raf = 0;

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

      const rotY = -p * 360;
      const tiltX = -6;
      wall.style.transform = `translateZ(-${RADIUS}px) rotateX(${tiltX}deg) rotateY(${rotY}deg)`;

      // If user is hovering a tile, hover wins. Otherwise pick the front-facing middle-row tile.
      if (hoverIdxRef.current === null) {
        const targetAngle = ((p * 360) % 360 + 360) % 360;
        const row = 1; // always middle row
        const rowAngleOffset = row % 2 === 0 ? 0 : ANGLE_STEP / 2;
        let bestCol = 0;
        let bestDist = Infinity;
        for (let col = 0; col < COLS; col++) {
          const a = (col * ANGLE_STEP + rowAngleOffset) % 360;
          let d = Math.abs(a - targetAngle);
          if (d > 180) d = 360 - d;
          if (d < bestDist) { bestDist = d; bestCol = col; }
        }
        applyFocus(row * COLS + bestCol);
      }

      const pct = Math.round(p * 100);
      if (pct !== progressDisplay) setProgressDisplay(pct);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featured = tiles[focusIdx] ?? tiles[0];

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

              return (
                <div
                  key={`${row}-${col}`}
                  ref={(n) => { tileRefs.current[i] = n; }}
                  className="v4-tile"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px)`,
                  }}
                  onMouseEnter={() => { hoverIdxRef.current = i; applyFocus(i); }}
                  onMouseLeave={() => { hoverIdxRef.current = null; }}
                  onClick={() => onSelect(tile)}
                >
                  <img src={tile.image} alt={tile.title} loading="lazy" decoding="async" />
                  <div className="v4-tile-meta">
                    <span>№ {String((i % tiles.length) + 1).padStart(3, "0")}</span>
                    <span>{tile.category}</span>
                  </div>
                  <div className="v4-tile-badge">
                    <span className="v4-chip-dot" /> в фокусе
                  </div>
                </div>
              );
            });
          })}
        </div>

        {/* HUD overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="v4-focus-frame">
            <span className="v4-focus-corner v4-focus-corner--tl" />
            <span className="v4-focus-corner v4-focus-corner--tr" />
            <span className="v4-focus-corner v4-focus-corner--bl" />
            <span className="v4-focus-corner v4-focus-corner--br" />
          </div>

          <div className="absolute top-6 left-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim">
            wall · 36 видимых · {dashboards.length} уникальных
          </div>
          <div className="absolute top-6 right-6 v4-mono text-[10px] uppercase tracking-[0.22em] v4-mint text-right">
            <div>{progressDisplay}%</div>
            <div className="v4-dim mt-1">в фокусе № {String(((focusIdx % dashboards.length)) + 1).padStart(3, "0")}</div>
          </div>

          {/* featured info */}
          <div className="absolute left-8 bottom-8 max-w-md v4-glass p-5 pointer-events-auto v4-info">
            <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-2 flex items-center gap-2">
              <span className="v4-chip-dot" /> сейчас смотрим
            </div>
            <div key={focusIdx} className="v4-info-anim">
              <div className="v4-serif text-3xl leading-tight mb-1">{featured.title}</div>
              <div className="v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim mb-3">
                {featured.author} · {featured.cohort} · {featured.category}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(40 30% 88%)" }}>
                {featured.description}
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim text-center">
            <div>скролл = поворот стены</div>
            <div className="v4-mint mt-1">наведи курсор — фокус сменится</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V4Wall;
