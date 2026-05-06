const V5CourseCTA = () => (
  <section id="course" className="relative px-6 md:px-12 py-32">
    <div className="max-w-[1200px] mx-auto v5-glass relative overflow-hidden p-10 md:p-20 text-center">
      {/* glow */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--v5-violet) / 0.35), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--v5-mint) / 0.3), transparent 70%)" }}
      />

      <div className="relative">
        <div className="v5-mono text-[11px] uppercase tracking-[0.3em] v5-mint mb-6 inline-flex items-center gap-2">
          <span className="v5-chip-dot" /> наш курс
        </div>
        <h2 className="v5-serif text-6xl md:text-8xl leading-[0.92] mb-6">
          Прощай, <span className="italic v5-violet">Excel</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg md:text-xl v5-dim leading-relaxed mb-10">
          Научим собирать дашборды уровня этой галереи — от первой выгрузки
          данных до защиты проекта перед заказчиком. 12 недель практики,
          реальные кейсы, наставник.
        </p>
        <a href="#" className="v5-cta-btn">
          Изучить курс
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>

        <div className="v5-rule mt-16 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 v5-mono text-[11px] uppercase tracking-[0.2em] v5-dim">
          <div><div className="v5-serif text-4xl v5-mint mb-1">12</div>недель</div>
          <div><div className="v5-serif text-4xl v5-mint mb-1">40+</div>уроков</div>
          <div><div className="v5-serif text-4xl v5-mint mb-1">8</div>проектов</div>
          <div><div className="v5-serif text-4xl v5-mint mb-1">1:1</div>с наставником</div>
        </div>
      </div>
    </div>
  </section>
);

export default V5CourseCTA;
