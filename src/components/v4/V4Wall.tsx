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

  const [focusIdx, setFocusIdx] = useState(0);
  const [progressDisplay, setProgressDisplay] = useState(0);
  const [rowDisplay, setRowDisplay] = useState(1);

  const tiles = useMemo(() => buildTiles(), []);

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

      // Split scroll: 70% rotates the wall, 30% sweeps rows (up → middle → down)
      // We loop the row sweep across the rotation a few times so user notices vertical motion.
      const rotY = -p * 360;                         // full revolution
      // verticalPhase: shifts the wall up/down so different rows align to the camera
      // sin gives a smooth oscillation across the scroll
      const verticalPhase = Math.sin(p * Math.PI * 2) * ROW_GAP; // -ROW_GAP..+ROW_GAP
      const tiltX = -6;                              // gentle constant tilt

      wall.style.transform = `translateZ(-${RADIUS}px) translateY(${verticalPhase}px) rotateX(${tiltX}deg) rotateY(${rotY}deg)`;

      // The tile facing the camera is at angle ≈ 0 (mod 360) relative to current rotation.
      // Each tile's world angle = colAngle. After rotating wall by rotY, the tile that
      // ends up facing camera has colAngle ≡ -rotY (mod 360). Because we rotate negatively,
      // -rotY = p*360.
      const targetAngle = ((p * 360) % 360 + 360) % 360;

      // Determine which row is closest to camera (cancels verticalPhase)
      // Camera-aligned row is the one whose yOffset ≈ -verticalPhase
      let bestRow = 1;
      let bestRowDist = Infinity;
      for (let row = 0; row < ROWS; row++) {
        const yOffset = (row - (ROWS - 1) / 2) * ROW_GAP;
        const d = Math.abs(yOffset + verticalPhase);
        if (d < bestRowDist) { bestRowDist = d; bestRow = row; }
      }

      // Determine which column is closest, accounting for the row's angle offset
      const rowAngleOffset = bestRow % 2 === 0 ? 0 : ANGLE_STEP / 2;
      let bestCol = 0;
      let bestColDist = Infinity;
      for (let col = 0; col < COLS; col++) {
        const a = (col * ANGLE_STEP + rowAngleOffset) % 360;
        let d = Math.abs(a - targetAngle);
        if (d > 180) d = 360 - d;
        if (d < bestColDist) { bestColDist = d; bestCol = col; }
      }

      const focus = bestRow * COLS + bestCol;
      if (focus !== lastFocusRef.current) {
        const prev = tileRefs.current[lastFocusRef.current];
        const next = tileRefs.current[focus];
        if (prev) prev.classList.remove("v4-tile--focus");
        if (next) next.classList.add("v4-tile--focus");
        lastFocusRef.current = focus;
        setFocusIdx(focus);
        setRowDisplay(bestRow);
        setProgressDisplay(Math.round(p * 100));
      } else {
        // Still update progress occasionally
        if (Math.abs(Math.round(p * 100) - progressDisplay) >= 1) {
          setProgressDisplay(Math.round(p * 100));
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featured = tiles[focusIdx] ?? tiles[0];
  const rowLabel = ["верхний", "средний", "нижний"][rowDisplay] ?? "средний";

  return (
    <section ref={sectionRef} id="wall" className="relative" style={{ height: "600vh" }}>
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
          {/* center frame — that's where the focused tile lands */}
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
            <div>{progressDisplay}% · ряд: {rowLabel}</div>
            <div className="v4-dim mt-1">в фокусе № {String(((focusIdx % dashboards.length)) + 1).padStart(3, "0")}</div>
          </div>

          {/* row indicator on the right edge */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 v4-mono text-[10px] uppercase tracking-[0.2em]">
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex items-center gap-2 justify-end">
                <span style={{ color: r === rowDisplay ? "hsl(152 76% 58%)" : "hsl(230 15% 45%)" }}>
                  {["верх", "центр", "низ"][r]}
                </span>
                <span
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: r === rowDisplay ? "hsl(152 76% 58%)" : "hsl(230 15% 30%)",
                    boxShadow: r === rowDisplay ? "0 0 12px hsl(152 76% 58%)" : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* featured info */}
          <div className="absolute left-8 bottom-8 max-w-md v4-glass p-5 pointer-events-auto v4-info">
            <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-2 flex items-center gap-2">
              <span className="v4-chip-dot" /> сейчас смотрим · {rowLabel} ряд
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
            <button
              onClick={() => onSelect(featured)}
              className="mt-4 v4-mono text-[11px] uppercase tracking-[0.22em] v4-mint v4-link"
            >
              открыть работу →
            </button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim text-center">
            <div>скролл = поворот стены + смена ряда</div>
            <div className="v4-mint mt-1">подсвеченная карточка = в фокусе</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V4Wall;
