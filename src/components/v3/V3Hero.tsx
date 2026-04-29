const V3Hero = () => {
  return (
    <section className="relative z-10 px-8 pt-20 pb-16 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-2 v3-mono text-xs uppercase tracking-[0.25em] v3-muted v3-rise">
          № 04 / 2026<br/>
          Vol. Data&nbsp;·&nbsp;Design
        </div>

        <h1 className="col-span-12 md:col-span-10 v3-display font-light leading-[0.92] text-[clamp(3.5rem,9vw,9rem)] v3-rise" style={{ animationDelay: '0.05s' }}>
          The <em className="italic v3-accent font-normal">Quiet</em> Power<br/>
          of a Well-Made<br/>
          <span className="font-medium">Dashboard.</span>
        </h1>
      </div>

      <div className="v3-rule mt-16 mb-8" />

      <div className="grid grid-cols-12 gap-8">
        <div className="hidden md:block md:col-span-2 v3-mono text-xs uppercase tracking-widest v3-muted">Editor's note</div>
        <p className="col-span-12 md:col-span-7 v3-display text-2xl md:text-3xl leading-snug font-light v3-rise" style={{ animationDelay: '0.15s' }}>
          Каждый дашборд — это эссе на языке цифр. Мы собрали <em>лучшие выпускные работы</em> студентов:
          истории, рассказанные через метрики, графики и тишину между ними.
        </p>
        <div className="col-span-12 md:col-span-3 flex flex-col gap-3 v3-rise" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-baseline justify-between border-b v3-border pb-2">
            <span className="v3-mono text-xs uppercase v3-muted">Works</span>
            <span className="v3-display text-3xl v3-num">240</span>
          </div>
          <div className="flex items-baseline justify-between border-b v3-border pb-2">
            <span className="v3-mono text-xs uppercase v3-muted">Cohorts</span>
            <span className="v3-display text-3xl v3-num">13</span>
          </div>
          <div className="flex items-baseline justify-between border-b v3-border pb-2">
            <span className="v3-mono text-xs uppercase v3-muted">Countries</span>
            <span className="v3-display text-3xl v3-num">42</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V3Hero;
