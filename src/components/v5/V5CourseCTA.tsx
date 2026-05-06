const V5CourseCTA = () => (
  <section id="course" className="relative px-6 md:px-12 pt-24 pb-32">
    <div className="max-w-[1280px] mx-auto">
      {/* Lead-in */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 v5-mono text-[11px] uppercase tracking-[0.3em] v5-green mb-6">
          <span className="v5-chip-dot" /> хотите так же?
        </div>
        <h2 className="v5-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto mb-6">
          Курс <span className="v5-hl">«Прощай, Эксель!»</span>
        </h2>
        <p className="max-w-2xl mx-auto v5-dim text-base md:text-lg leading-relaxed">
          Как делать дашборды на ИИ-стероидах в 10 раз быстрее.
          Лайфхаки для Claude, DeepSeek и ChatGPT, методы безопасной работы
          с аналитикой и лучшие практики визуализации.
        </p>
      </div>

      {/* Headline numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="v5-stat v5-stat--green">
          <div className="v5-display text-4xl mb-2">4 <span className="v5-green">недели</span></div>
          <div className="text-sm v5-dim">интенсивного обучения онлайн</div>
        </div>
        <div className="v5-stat v5-stat--blue">
          <div className="v5-display text-4xl mb-2">7 <span className="v5-blue">модулей</span></div>
          <div className="text-sm v5-dim">от анализа до выпускного проекта</div>
        </div>
        <div className="v5-stat v5-stat--yellow">
          <div className="v5-display text-4xl mb-2">2 <span className="v5-yellow">урока</span><span className="text-base v5-dim">/нед</span></div>
          <div className="text-sm v5-dim">онлайн-сессии и материалы на ГетКурс</div>
        </div>
        <div className="v5-stat v5-stat--red">
          <div className="v5-display text-4xl mb-2"><span className="v5-red">Claude</span> MAX</div>
          <div className="text-sm v5-dim">доступ на период обучения</div>
        </div>
      </div>

      {/* CTA */}
      <div className="v5-cta-banner relative px-8 md:px-14 py-12 md:py-16 min-h-[280px] flex items-center">
        <div className="v5-cta-banner-rings hidden md:block" />
        <div className="relative z-10 max-w-xl">
          <h3 className="v5-display text-3xl md:text-5xl mb-4 leading-tight">
            Изучите <span className="v5-green">программу</span> курса
            <br />и записывайтесь на поток
          </h3>
          <p className="v5-dim text-sm md:text-base mb-8">
            Тарифы от <span className="v5-green font-semibold">20 000 ₽</span> · доступ к урокам до 12 месяцев · сертификат
          </p>
          <a
            href="https://neyro.mba/intensiv-dash-ai"
            target="_blank"
            rel="noreferrer"
            className="v5-cta-btn"
          >
            Изучить программу →
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default V5CourseCTA;
