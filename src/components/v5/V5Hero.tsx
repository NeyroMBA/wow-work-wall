import { dashboards } from "@/data/dashboards";

const V5Hero = () => {
  const top = [...dashboards, ...dashboards];
  const bot = [...dashboards.slice().reverse(), ...dashboards.slice().reverse()];

  return (
    <section className="relative pt-36 pb-12">
      {/* Title */}
      <div className="text-center px-6 mb-12">
        <div className="v5-mono text-[11px] uppercase tracking-[0.3em] v5-green mb-6 inline-flex items-center gap-2">
          <span className="v5-chip-dot" /> галерея выпускных работ
        </div>
        <h1 className="v5-display text-[13vw] md:text-[7.5vw]">
          Данные, превращённые
          <br />
          <span className="v5-hl">в искусство</span>
        </h1>
        <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg v5-dim leading-relaxed">
          Лучшие дашборды студентов Института Нейро-Аналитики — от продаж
          до аналитики здоровья. Каждая работа — история, спрятанная в цифрах.
        </p>

        {/* Stat tiles, INA-style */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="v5-stat v5-stat--green">
            <div className="v5-display text-3xl mb-1">240+ <span className="v5-green">работ</span></div>
            <div className="text-sm v5-dim">от выпускников 18 когорт</div>
          </div>
          <div className="v5-stat v5-stat--blue">
            <div className="v5-display text-3xl mb-1">10 <span className="v5-blue">тем</span></div>
            <div className="text-sm v5-dim">от HR до недвижимости</div>
          </div>
          <div className="v5-stat v5-stat--yellow">
            <div className="v5-display text-3xl mb-1">SQL · BI · DAX</div>
            <div className="text-sm v5-dim">реальные инструменты</div>
          </div>
          <div className="v5-stat v5-stat--red">
            <div className="v5-display text-3xl mb-1">2026 <span className="v5-red">издание</span></div>
            <div className="text-sm v5-dim">обновлено к выпуску №05</div>
          </div>
        </div>
      </div>

      {/* 3D ribbon */}
      <div className="v5-ribbon mt-8">
        <div className="v5-ribbon-row v5-ribbon-row--top">
          {top.map((d, i) => (
            <div key={`t-${i}`} className="v5-rcard">
              <img src={d.image} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="v5-ribbon-row v5-ribbon-row--bot">
          {bot.map((d, i) => (
            <div key={`b-${i}`} className="v5-rcard">
              <img src={d.image} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V5Hero;
