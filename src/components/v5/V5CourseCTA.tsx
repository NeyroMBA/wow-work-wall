const modules = [
  { n: "01", t: "Как нейросеть заменит вам аналитика", d: "Возможности зарубежных и отечественных нейросетей, лучшие практики отчётов и дашбордов." },
  { n: "02", t: "Быстрый анализ данных", d: "За 2 минуты обрабатываем сырые данные из Excel, контролируем точность, проверяем гипотезы с ИИ." },
  { n: "03", t: "Профессиональный бизнес-дашборд", d: "Метрики результата, диагностики и действия. Карточки KPI и работа с диаграммами." },
  { n: "04", t: "Обновление данных и конфиденциальность", d: "Шифрование, безопасное обновление, отчётность на уровне компании." },
  { n: "05", t: "Сценарный анализ", d: "Что-если, подбор параметров, кластерный анализ текста и извлечение смыслов." },
  { n: "06", t: "Дата-сторителлинг", d: "Презентация интерактивных сценариев, методы сторителлинга, пояснительная записка." },
  { n: "07", t: "Выпускной проект", d: "Дашборд от данных до отчёта: HR, кредитный портфель, логистика, онлайн-курсы или свои данные." },
];

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

      {/* Program */}
      <div className="mb-16">
        <div className="flex items-end justify-between mb-8">
          <h3 className="v5-display text-3xl md:text-5xl">Программа</h3>
          <div className="v5-mono text-xs uppercase tracking-[0.25em] v5-dim hidden md:block">
            7 модулей · 4 недели
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {modules.map((m) => (
            <div
              key={m.n}
              className="flex gap-5 p-5 rounded-2xl border"
              style={{ borderColor: "hsl(0 0% 16%)", background: "hsl(0 0% 7%)" }}
            >
              <div className="v5-mono text-sm v5-green pt-1 shrink-0">№ {m.n}</div>
              <div>
                <div className="v5-display text-lg mb-1.5">{m.t}</div>
                <div className="text-sm v5-dim leading-relaxed">{m.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="text-center mb-10">
        <h3 className="v5-display text-5xl md:text-7xl">
          Старт потока <span className="v5-blue">1 июня</span>
        </h3>
      </div>

      {/* CTA */}
      <div className="v5-cta-banner relative px-8 md:px-14 py-12 md:py-16 min-h-[280px] flex items-center">
        <div className="v5-cta-banner-rings hidden md:block" />
        <div className="relative z-10 max-w-xl">
          <h3 className="v5-display text-3xl md:text-5xl mb-4 leading-tight">
            Запишитесь на курс<br />
            и получите <span className="v5-green">бесплатную</span> консультацию
          </h3>
          <p className="v5-dim text-sm md:text-base mb-8">
            Тарифы от <span className="v5-green font-semibold">20 000 ₽</span> · доступ к урокам до 12 месяцев · сертификат
          </p>
          <a
            href="https://neyro.mba/intensiv-dash-ai#buy"
            target="_blank"
            rel="noreferrer"
            className="v5-cta-btn"
          >
            Записаться на интенсив →
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default V5CourseCTA;
