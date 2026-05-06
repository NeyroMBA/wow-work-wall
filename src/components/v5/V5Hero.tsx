import { dashboards } from "@/data/dashboards";

const COLS = 12;
const RADIUS = 620;
const ROW_GAP = 230;

const V5Hero = () => {
  const tiles = dashboards;

  return (
    <section className="v5-hero-screen">
      <div className="v5-hero-stage">
        {/* Auto-rotating 3D wall (V4-style) */}
        <div className="v5-wall-wrap">
          <div className="v5-wall v5-wall--spin">
            {[0, 1].map((row) => {
              const yOffset = (row - 0.5) * ROW_GAP;
              const rowAngleOffset = row % 2 === 0 ? 0 : 360 / COLS / 2;
              const dir = row === 0 ? 1 : -1;
              return Array.from({ length: COLS }).map((_, col) => {
                const i = row * COLS + col;
                const tile = tiles[i % tiles.length];
                const angle = col * (360 / COLS) + rowAngleOffset;
                return (
                  <div
                    key={`${row}-${col}`}
                    className="v5-tile"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOffset}px) rotateY(${-angle}deg)`,
                    }}
                  >
                    <img src={tile.image} alt="" loading="lazy" decoding="async" />
                    <div className="v5-tile-meta">
                      <span>№ {String((i % tiles.length) + 1).padStart(3, "0")}</span>
                      <span>{tile.category}</span>
                    </div>
                  </div>
                );
              }).map((node, idx) => (
                // wrap each row in spinner via key trick — but we need group rotation.
                node
              ));
            })}
          </div>
        </div>

        {/* Title overlay */}
        <div className="v5-hero-title">
          <h1 className="v5-display text-[10vw] md:text-[5.5vw]">
            Данные, превращённые
            <br />
            <span className="v5-hl">в искусство</span>
          </h1>
          <p className="mt-5 mx-auto max-w-xl text-sm md:text-base v5-dim leading-relaxed">
            Лучшие дашборды студентов Института Нейро-Аналитики — каждая работа история, спрятанная в цифрах.
          </p>
        </div>
      </div>
    </section>
  );
};

export default V5Hero;
