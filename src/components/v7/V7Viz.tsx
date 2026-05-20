/**
 * Tiny deterministic SVG visualizations used inside V7 cards.
 * Pure SVG, no libs. Color uses the parent card's --acc CSS variable.
 */

const seedRand = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

const W = 480;
const H = 180;

const palettes = {
  green: "hsl(75 80% 60%)",
  blue: "hsl(220 90% 65%)",
  yellow: "hsl(42 95% 60%)",
  red: "hsl(355 80% 58%)",
  violet: "hsl(260 70% 65%)",
  orange: "hsl(22 95% 60%)",
};

export type VizKind = "line" | "area" | "bars" | "funnel" | "candles" | "heatmap" | "scatter";

export const V7Viz = ({ kind, seed, color }: { kind: VizKind; seed: number; color: keyof typeof palettes }) => {
  const stroke = palettes[color];
  const rand = seedRand(seed + 1);

  if (kind === "line" || kind === "area") {
    const pts: { x: number; y: number }[] = [];
    const n = 18;
    let y = H * 0.55;
    for (let i = 0; i < n; i++) {
      y += (rand() - 0.5) * 30;
      y = Math.max(28, Math.min(H - 28, y));
      pts.push({ x: (i / (n - 1)) * W, y });
    }
    const d = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
    const dArea = `${d} L${W},${H} L0,${H} Z`;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g${seed}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="0" x2={W} y1={H * p} y2={H * p} stroke="hsl(0 0% 100% / 0.04)" />
        ))}
        {kind === "area" && <path d={dArea} fill={`url(#g${seed})`} />}
        <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill={stroke} />
      </svg>
    );
  }

  if (kind === "bars") {
    const n = 16;
    const gap = 6;
    const bw = (W - gap * (n - 1)) / n;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {Array.from({ length: n }).map((_, i) => {
          const h = 30 + rand() * (H - 50);
          return (
            <rect
              key={i}
              x={i * (bw + gap)}
              y={H - h}
              width={bw}
              height={h}
              rx={2}
              fill={stroke}
              opacity={0.55 + rand() * 0.4}
            />
          );
        })}
      </svg>
    );
  }

  if (kind === "funnel") {
    const steps = 5;
    const labels = ["100%", "78%", "54%", "31%", "12%"];
    const top = 20;
    const bot = H - 14;
    const cx = W / 2;
    const maxW = W * 0.55;
    const minW = W * 0.12;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {Array.from({ length: steps }).map((_, i) => {
          const t = i / steps;
          const t2 = (i + 1) / steps;
          const w1 = maxW - (maxW - minW) * t;
          const w2 = maxW - (maxW - minW) * t2;
          const y1 = top + (bot - top) * t;
          const y2 = top + (bot - top) * t2 - 3;
          return (
            <polygon
              key={i}
              points={`${cx - w1 / 2},${y1} ${cx + w1 / 2},${y1} ${cx + w2 / 2},${y2} ${cx - w2 / 2},${y2}`}
              fill="none"
              stroke={stroke}
              strokeOpacity={0.85}
              strokeWidth="1.5"
            />
          );
        })}
        {labels.map((l, i) => {
          const t = (i + 0.5) / steps;
          const y = top + (bot - top) * t;
          return (
            <text key={l} x={W - 8} y={y + 3} textAnchor="end" fontSize="10" fill="hsl(0 0% 70%)" fontFamily="JetBrains Mono, monospace">
              {l}
            </text>
          );
        })}
      </svg>
    );
  }

  if (kind === "candles") {
    const n = 22;
    const cw = W / n;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {Array.from({ length: n }).map((_, i) => {
          const mid = H / 2 + (rand() - 0.5) * 40;
          const up = rand() > 0.45;
          const body = 8 + rand() * 30;
          const wick = body + 10 + rand() * 18;
          const col = up ? "hsl(75 70% 55%)" : "hsl(355 75% 55%)";
          return (
            <g key={i} transform={`translate(${i * cw + cw / 2}, 0)`}>
              <line x1="0" x2="0" y1={mid - wick / 2} y2={mid + wick / 2} stroke={col} strokeWidth="1" />
              <rect x={-cw * 0.28} y={mid - body / 2} width={cw * 0.56} height={body} fill={col} />
            </g>
          );
        })}
      </svg>
    );
  }

  if (kind === "heatmap") {
    const cols = 14;
    const rows = 5;
    const gap = 4;
    const cw = (W - gap * (cols - 1)) / cols;
    const ch = (H - gap * (rows - 1)) / rows;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const v = rand();
            return (
              <rect
                key={`${r}-${c}`}
                x={c * (cw + gap)}
                y={r * (ch + gap)}
                width={cw}
                height={ch}
                rx={2}
                fill={stroke}
                opacity={0.15 + v * 0.75}
              />
            );
          })
        )}
      </svg>
    );
  }

  // scatter / network
  const nodes = Array.from({ length: 14 }).map(() => ({
    x: 20 + rand() * (W - 40),
    y: 20 + rand() * (H - 40),
  }));
  const hub = nodes[0];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke={stroke} strokeOpacity="0.25" strokeWidth="1" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 5 : 3} fill={stroke} opacity={i === 0 ? 1 : 0.75} />
      ))}
    </svg>
  );
};

export default V7Viz;
