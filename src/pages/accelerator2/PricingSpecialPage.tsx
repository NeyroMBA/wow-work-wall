import { useState, useEffect } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";
import GetCourseWidgetDialog from "@/components/accelerator2/GetCourseWidgetDialog";

const courses = [
  { idx: "01", name: "Нейросети для бизнеса и карьеры", plan: "Тариф «Для бизнеса»", price: "120 000 ₽", href: "https://neyro.mba/aiforbusiness-aa?scan=62e1b084-550c-4fff-9dc2-6441458e076e&scan_id=489e9b98-4377-46be-8c4a-48d0ebb5c4dd" },
  { idx: "02", name: "Python + нейросети", plan: "Тариф «С поддержкой кураторов»", price: "60 000 ₽", href: "https://neyro.mba/cursor?rel_scan=489e9b98-4377-46be-8c4a-48d0ebb5c4dd%7C{}" },
  { idx: "03", name: "Вайбкодинг: с нуля к IT-системе с Cursor", plan: "Тариф «Бизнес»", price: "30 000 ₽", href: "https://neyro.mba/cursor?rel_scan=489e9b98-4377-46be-8c4a-48d0ebb5c4dd%7C{}" },
  { idx: "04", name: "ИИ-дашборды", plan: "Тариф «Бизнес»", price: "60 000 ₽", href: "https://neyro.mba/intensiv-dash-ai?scan=593f8a93-cb8b-4abb-8bed-fac8c8698a1a&scan_id=489e9b98-4377-46be-8c4a-48d0ebb5c4dd" },
  { idx: "05", name: "ИИ-агенты", plan: "Тариф «Архитектор»", price: "39 900 ₽", href: "https://neyro.mba/ai-agents-zz?scan=a99b42d7-fc3e-4fff-9bce-f5aae0f88b92&scan_id=489e9b98-4377-46be-8c4a-48d0ebb5c4dd" },
];

const infra = [
  { name: "Персональная диагностика + интервью с куратором", desc: "Карта компетенций и рекомендованный маршрут", price: "5 000 ₽" },
  { name: "Живой коворкинг 3×/нед", desc: "48 сессий по 90 минут с трекерами", price: "40 000 ₽" },
  { name: "Индивидуальная поддержка трекера", desc: "Обратная связь по вашему проекту на весь период", price: "20 000 ₽" },
  { name: "Демо-сессии каждые 2 недели", desc: "8 сессий разбора прогресса с экспертами", price: "10 000 ₽" },
  { name: "Персональный дашборд прогресса", desc: "Карта компетенций, спринты, итерации проекта", price: "3 000 ₽" },
];

const bullets = [
  { b: "5 курсов", t: "выберете тот, который актуален для вашей задачи сейчас" },
  { b: "Персональный трек", t: "онбординг покажет, с чего начать именно вам" },
  { b: "Живой коворкинг 3×/нед", t: "приходите с задачей, уходите с результатом" },
  { b: "Обратная связь от трекеров", t: "не застрянете в одиночку" },
  { b: "Демо-сессии каждые 2 недели", t: "ритм, который не даст бросить" },
];

const PricingPage = () => {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div data-theme="accelerator" className="min-h-screen bg-background flex flex-col">
      <Navbar onSignupClick={() => setSignupOpen(true)} />
      <main className="flex-1 pt-16">
        <section className="container mx-auto px-6 pt-16 md:pt-24 pb-[34px] md:pb-[66px]">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">{"\n"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Что входит в программу
            </h2>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-10 rounded-2xl border-2 border-primary/30 bg-background p-8 md:p-10 text-center">
            <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Полная стоимость Акселератора</p>
                <p className="text-4xl md:text-5xl font-bold line-through text-muted-foreground">160 000 ₽</p>
              </div>
              <div>
                <p className="text-sm text-primary font-medium mb-3">🔥 Специальное предложение</p>
                <p className="text-4xl md:text-5xl font-bold text-foreground">
                  30 000 <span className="text-2xl text-muted-foreground font-medium">₽</span>
                </p>
                <div className="mt-4 inline-flex items-center rounded-lg bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
                  Доступ к коворкингам на 1 месяц
                </div>
              </div>
            </div>
            <ul className="text-left space-y-3 mb-8">
              {bullets.map((b) => (
                <li key={b.b} className="flex items-start gap-3">
                  <Check size={20} className="text-primary shrink-0 mt-1" />
                  <p className="text-foreground leading-relaxed">
                    <span className="font-semibold">{b.b}</span> — {b.t}
                  </p>
                </li>
              ))}
            </ul>

            <p className="text-primary font-medium mb-8">Получите пробный доступ к программе на 1 месяц</p>

            <button type="button" onClick={() => setSignupOpen(true)} className="inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full">
              Присоединиться
            </button>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Войти можно в любой момент · Без потоков и дат старта
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{"\n"}</p>
          </motion.div>

          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl leading-[53px] md:leading-[57px] font-bold text-foreground">
              Доступ ко всей инфраструктуре
              <br />
              Акселератора на 1 месяц
            </h3>
          </div>

          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Часть 1 · 5 курсов (тариф с поддержкой)
            </p>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {courses.map((c) => (
                <div key={c.idx} className="flex items-start gap-2 p-5">
                  <span className="text-primary font-mono font-semibold text-sm mt-0.5 shrink-0">{c.idx}</span>
                  <div className="min-w-0 flex-1">
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-foreground no-underline hover:opacity-80 transition-opacity"
                      >
                        {c.name}
                        <ArrowUpRight
                          className="text-muted-foreground shrink-0"
                          style={{ width: "1em", height: "1em" }}
                        />
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">{c.name}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{c.plan}</p>
                  </div>
                  <p className="text-muted-foreground font-medium text-right shrink-0">{c.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Часть 2 · Инфраструктура акселератора
            </p>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {infra.map((r) => (
                <div key={r.name} className="flex items-start gap-2 p-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{r.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                  </div>
                  <p className="text-muted-foreground font-medium text-right shrink-0">{r.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-[34px] md:pb-[66px] flex justify-center">
          <div className="w-full max-w-[668px] px-8 md:px-10">
            <button type="button" onClick={() => setSignupOpen(true)} className="inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full">
              Присоединиться
            </button>
          </div>
        </div>

        <section className="container mx-auto px-6 pb-16 md:pb-24">
          <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="font-bold text-foreground text-[clamp(9px,2.8vw,24px)] leading-tight mb-4 md:mb-5">
                  Остались вопросы?
                </h3>
                <p className="text-[14px] md:text-[15px] font-normal text-muted-foreground leading-relaxed">
                  {"Заполните форму, и\u00A0мы свяжемся с\u00A0Вами, чтобы ответить на\u00A0вопросы о\u00A0пробном доступе к\u00A0программе Акселератора."}
                </p>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSignupOpen(true)}
                  className="inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full"
                >
                  Задать вопрос
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <FooterSection />

      <GetCourseWidgetDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        title="Записаться на акселератор"
        scriptId="b51239bc91c7f2321c5c4b324650f6cc3e9fd3d9"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1658893"
      />
    </div>
  );
};

export default PricingPage;
