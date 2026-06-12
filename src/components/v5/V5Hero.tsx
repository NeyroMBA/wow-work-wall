import { dashboards, type Dashboard } from "@/data/dashboards";

const HERO_SKIP = new Set(["vebinar_dash", "calc", "archive"]);
const heroDashboards = dashboards.filter((d) => !HERO_SKIP.has(d.id));

const CATEGORY_LABEL: Record<Dashboard["category"], string> = {
  Sales: "Продажи",
  Finance: "Финансы",
  Marketing: "Маркетинг",
  HR: "HR",
  Health: "Здоровье",
  SaaS: "SaaS",
  Logistics: "Логистика",
  RealEstate: "Недвижимость",
  Support: "Поддержка",
};

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
        const tile = heroDashboards[i % heroDashboards.length];
        const angle = col * (360 / COLS) + rowAngleOffset;
        return (
          <div
            key={col}
            className={`v5-tile v5-pal-${tile.palette ?? "dark"}`}
            style={{
              transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px)`,
            }}
          >
            <div className="v5-tile-inner">
              <img src={tile.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="v5-tile-meta">
              <span>№ {String((i % heroDashboards.length) + 1).padStart(3, "0")}</span>
              <span>{CATEGORY_LABEL[tile.category]}</span>
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
      {/* Headline */}
      <div className="v5-hero-headline">
        <h1 className="v5-display">
          Данные,
          <br />
          превращённые
          <br />
          <span className="v5-hero-italic">в искусство.</span>
        </h1>
        <p className="v5-hero-preheader">
          Лучшие дашборды студентов Института Нейро-Аналитики —
          каждая работа история, спрятанная в цифрах.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="v5-hero-cue v5-mono text-[10px] uppercase tracking-[0.32em] v5-dim">
        ↓ галерея ниже
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
