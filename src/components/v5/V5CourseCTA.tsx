const V5CourseCTA = () => (
  <section id="course" className="relative px-6 md:px-12 pt-24 pb-32">
    <div className="max-w-[1280px] mx-auto">
      {/* Lead-in */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 v5-mono text-[11px] uppercase tracking-[0.3em] v5-green mb-6">
          <span className="v5-chip-dot" /> хотите так же?
        </div>
        <h2 className="v5-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto mb-6">
          Каждая работа выше — это выпускник, который начинал
          <span className="v5-hl"> с нуля</span>.
        </h2>
        <p className="max-w-xl mx-auto v5-dim text-base md:text-lg leading-relaxed">
          За 10 месяцев в Институте Нейро-Аналитики вы соберёте
          собственный дашборд уровня этой галереи — и защитите его
          перед заказчиком.
        </p>
      </div>

      <div className="text-center mb-10">
        <h3 className="v5-display text-5xl md:text-7xl">
          Старт обучения <span className="v5-blue">18 мая</span>
        </h3>
      </div>

      <div className="v5-cta-banner relative px-8 md:px-14 py-12 md:py-16 min-h-[280px] flex items-center">
        <div className="v5-cta-banner-rings hidden md:block" />
        <div className="relative z-10 max-w-xl">
          <h3 className="v5-display text-3xl md:text-5xl mb-8 leading-tight">
            Запишитесь на обучение<br />
            и получите <span className="v5-green">бесплатную</span> консультацию
          </h3>
          <a href="#" className="v5-cta-btn">
            Оставить заявку в анкету
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="v5-stat v5-stat--green">
          <div className="v5-display text-4xl mb-2">10 <span className="v5-green">мес</span></div>
          <div className="text-sm v5-dim">обучения по мировым практикам</div>
        </div>
        <div className="v5-stat v5-stat--blue">
          <div className="v5-display text-4xl mb-2">40+ <span className="v5-blue">работ</span></div>
          <div className="text-sm v5-dim">по SQL, Power BI, DAX, Excel</div>
        </div>
        <div className="v5-stat v5-stat--red">
          <div className="v5-display text-4xl mb-2">2 <span className="v5-red">диплома</span></div>
          <div className="text-sm v5-dim">установленного образца ДПО</div>
        </div>
        <div className="v5-stat v5-stat--yellow">
          <div className="v5-display text-4xl mb-2">+20 <span className="v5-yellow">экспертов</span></div>
          <div className="text-sm v5-dim">аналитики, тренеры, кураторы</div>
        </div>
      </div>
    </div>
  </section>
);

export default V5CourseCTA;
