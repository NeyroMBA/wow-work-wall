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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="v5-stat v5-stat--green">
          <div className="v5-display text-2xl md:text-4xl mb-2">4 <span className="v5-green">недели</span></div>
          <div className="text-xs md:text-sm v5-dim">интенсивного обучения онлайн</div>
        </div>
        <div className="v5-stat v5-stat--blue">
          <div className="v5-display text-2xl md:text-4xl mb-2">7 <span className="v5-blue">модулей</span></div>
          <div className="text-xs md:text-sm v5-dim">от анализа до выпускного проекта</div>
        </div>
        <div className="v5-stat v5-stat--yellow">
          <div className="v5-display text-2xl md:text-4xl mb-2">2 <span className="v5-yellow">урока</span><span className="text-sm v5-dim">/нед</span></div>
          <div className="text-xs md:text-sm v5-dim">онлайн-сессии и материалы на ГетКурс</div>
        </div>
        <div className="v5-stat v5-stat--red">
          <div className="v5-display text-2xl md:text-4xl mb-2"><span className="v5-red">Claude</span> MAX</div>
          <div className="text-xs md:text-sm v5-dim">доступ на период обучения</div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://neyro.mba/intensiv-dash-ai"
          target="_blank"
          rel="noreferrer"
          className="v5-cta-btn"
        >
          Изучить программу →
        </a>
        <div className="v5-mono text-xs v5-dim">
          Тарифы от <span className="v5-green">20 000 ₽</span> · сертификат
        </div>
      </div>
    </div>
  </section>
);

export default V5CourseCTA;
