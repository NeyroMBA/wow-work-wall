import { dashboards } from "@/data/dashboards";

const COLS = 10;
const RADIUS = 560;
const ROW_GAP = 220;

const Row = ({ row, dir }: { row: number; dir: 1 | -1 }) => {
  const yOffset = (row - 0.5) * ROW_GAP;
  const rowAngleOffset = row % 2 === 0 ? 0 : 360 / COLS / 2;
  return (
    <div
      className="v5-wall-row"
      style={{
        animation: `v5-spin-${dir === 1 ? "cw" : "ccw"} 60s linear infinite`,
      }}
    >
      {Array.from({ length: COLS }).map((_, col) => {
        const i = row * COLS + col;
        const tile = dashboards[i % dashboards.length];
        const angle = col * (360 / COLS) + rowAngleOffset;
        return (
          <div
            key={col}
            className="v5-tile"
            style={{
              transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px)`,
            }}
          >
            <img src={tile.image} alt="" loading="lazy" decoding="async" />
            <div className="v5-tile-meta">
              <span>№ {String((i % dashboards.length) + 1).padStart(3, "0")}</span>
              <span>{tile.category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const V5Hero = () => {
  return (
    <section className="v5-hero-screen">
      {/* Top label */}
      <div className="v5-hero-top">
        <div className="inline-flex items-center gap-2 v5-mono text-[11px] uppercase tracking-[0.32em] v5-green">
          <span className="v5-chip-dot" /> Галерея · поток 2026
        </div>
      </div>

      {/* Headline */}
      <div className="v5-hero-headline">
        <h1 className="v5-display">
          Данные,
          <br />
          превращённые
          <br />
          <span className="v5-hero-italic">в искусство.</span>
        </h1>
      </div>

      {/* Right caption */}
      <div className="v5-hero-caption">
        <div className="v5-mono text-[10px] uppercase tracking-[0.28em] v5-dim mb-3">
          № 001 / collection
        </div>
        <p className="text-sm md:text-[15px] leading-relaxed" style={{ color: "hsl(0 0% 88%)" }}>
          Лучшие дашборды студентов
          Института Нейро-Аналитики —
          каждая работа история, спрятанная в цифрах.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="v5-hero-cue v5-mono text-[10px] uppercase tracking-[0.32em] v5-dim">
        ↓ скролл — галерея ниже
      </div>

      {/* Wall */}
      <div className="v5-hero-stage">
        <div className="v5-wall-wrap">
          <div className="v5-wall">
            <Row row={0} dir={1} />
            <Row row={1} dir={-1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default V5Hero;
