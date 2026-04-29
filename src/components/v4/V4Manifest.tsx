const V4Manifest = () => {
  return (
    <section id="manifest" className="relative px-8 py-32 v4-grain">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-2 v4-mono text-[11px] uppercase tracking-[0.2em] v4-dim">
          № 003
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2 className="v4-serif text-[8vw] md:text-[5.5vw] leading-[0.95]">
            Данные — это <span className="italic v4-violet">материал</span>.<br />
            Дашборд — <span className="italic v4-mint">скульптура</span>.
          </h2>
        </div>
      </div>

      <div className="v4-rule mb-12" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 md:col-start-3">
          <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-3">I. Принцип</div>
          <p className="text-base leading-relaxed" style={{ color: "hsl(40 30% 88%)" }}>
            Каждая работа в этой галерее — это диалог между вопросом и числом.
            Студент учится не строить графики, а задавать правильные вопросы.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim mb-3">II. Метод</div>
          <p className="text-base leading-relaxed" style={{ color: "hsl(40 30% 88%)" }}>
            Шесть месяцев: SQL, Python, визуализация, продуктовая аналитика.
            Финал — собственный дашборд под реальную задачу индустрии.
          </p>
        </div>
      </div>

      <div className="v4-rule my-24" />

      <div className="overflow-hidden">
        <div className="v4-marquee v4-serif text-[10vw] italic">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-16 pr-16">
              <span>Tableau</span>
              <span className="v4-mint">·</span>
              <span>SQL</span>
              <span className="v4-violet">·</span>
              <span>Python</span>
              <span className="v4-mint">·</span>
              <span>Power BI</span>
              <span className="v4-violet">·</span>
              <span>dbt</span>
              <span className="v4-mint">·</span>
              <span>Looker</span>
              <span className="v4-violet">·</span>
              <span>Metabase</span>
              <span className="v4-mint">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V4Manifest;
