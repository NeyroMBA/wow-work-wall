import { dashboards } from "@/data/dashboards";

const V5Hero = () => {
  const top = [...dashboards, ...dashboards];
  const bot = [...dashboards.slice().reverse(), ...dashboards.slice().reverse()];

  return (
    <section className="relative pt-36 pb-12">
      {/* Title */}
      <div className="text-center px-6 mb-12">
        <h1 className="v5-display text-[13vw] md:text-[7.5vw]">
          Данные, превращённые
          <br />
          <span className="v5-hl">в искусство</span>
        </h1>
        <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg v5-dim leading-relaxed">
          Лучшие дашборды студентов Института Нейро-Аналитики — от продаж
          до аналитики здоровья. Каждая работа — история, спрятанная в цифрах.
        </p>
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
