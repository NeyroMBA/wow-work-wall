import { dashboards } from "@/data/dashboards";

const V5Hero = () => {
  // Duplicate twice for seamless loop
  const top = [...dashboards, ...dashboards];
  const bot = [...dashboards.slice().reverse(), ...dashboards.slice().reverse()];

  return (
    <section className="relative pt-36 pb-12">
      {/* meta line */}
      <div className="px-8 flex justify-between items-center mb-12 v5-mono text-[10px] uppercase tracking-[0.22em] v5-dim">
        <div>Издание 2026 · выпуск №05</div>
        <div className="hidden md:block">240 работ · 18 когорт</div>
      </div>

      {/* Title */}
      <div className="text-center px-6 mb-16">
        <div className="v5-mono text-[11px] uppercase tracking-[0.3em] v5-mint mb-6 inline-flex items-center gap-2">
          <span className="v5-chip-dot" /> галерея выпускных работ
        </div>
        <h1 className="v5-serif text-[14vw] md:text-[8.5vw] leading-[0.88]">
          Данные, превращённые
          <br />
          <span className="italic v5-violet">в искусство</span>
        </h1>
        <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg v5-dim leading-relaxed">
          Лучшие дашборды наших студентов — от продаж до аналитики здоровья.
          Каждая работа рассказывает историю, спрятанную в цифрах.
        </p>
      </div>

      {/* 3D ribbon */}
      <div className="v5-ribbon">
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
