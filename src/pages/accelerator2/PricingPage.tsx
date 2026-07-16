import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";
import GetCourseWidgetDialog from "@/components/accelerator2/GetCourseWidgetDialog";
import PricingCalculator from "@/components/accelerator2/PricingCalculator";

const courses = [
  { idx: "01", name: "Нейросети для бизнеса и карьеры", plan: "Тариф «Для бизнеса»", price: "120 000 ₽" },
  { idx: "02", name: "Python + нейросети", plan: "Тариф «С поддержкой кураторов»", price: "60 000 ₽" },
  { idx: "03", name: "Вайбкодинг: с нуля к IT-системе с Cursor", plan: "Тариф «Бизнес»", price: "30 000 ₽" },
  { idx: "04", name: "ИИ-дашборды", plan: "Тариф «Бизнес»", price: "60 000 ₽" },
  { idx: "05", name: "ИИ-агенты", plan: "Тариф «Архитектор»", price: "39 900 ₽" },
];

const infra = [
  { name: "Персональная диагностика + интервью с куратором", desc: "Карта компетенций и рекомендованный маршрут", price: "5 000 ₽" },
  { name: "Живой коворкинг 3×/нед", desc: "48 сессий по 90 минут с трекерами", price: "40 000 ₽" },
  { name: "Индивидуальная поддержка трекера", desc: "Обратная связь по вашему проекту на весь период", price: "20 000 ₽" },
  { name: "Демо-сессии каждые 2 недели", desc: "8 сессий разбора прогресса с экспертами", price: "10 000 ₽" },
  { name: "Персональный дашборд прогресса", desc: "Карта компетенций, спринты, итерации проекта", price: "3 000 ₽" },
];

const bullets = [
  { b: "5 курсов", t: "от промптинга до ИИ-агентов, в своём темпе" },
  { b: "Персональный трек", t: "диагностика покажет, с чего начать именно вам" },
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
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">Честный расчёт</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Что входит в программу
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Часть 1 · 5 курсов (тариф с поддержкой)
            </p>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {courses.map((c) => (
                <div key={c.idx} className="flex items-start gap-4 p-5">
                  <span className="text-primary font-mono font-semibold text-sm mt-0.5 shrink-0">{c.idx}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.plan}</p>
                  </div>
                  <p className="text-muted-foreground font-medium text-right shrink-0 ml-4">{c.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Часть 2 · Инфраструктура акселератора
            </p>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {infra.map((r) => (
                <div key={r.name} className="flex items-start gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{r.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                  </div>
                  <p className="text-muted-foreground font-medium text-right shrink-0 ml-4">{r.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Полная стоимость компонентов по отдельности</p>
              <p className="text-4xl md:text-5xl font-bold line-through text-muted-foreground">437 600 ₽</p>
              <p className="text-sm text-muted-foreground mt-3">359 600 ₽ курсы + 78 000 ₽ инфраструктура</p>
            </div>
            <div>
              <p className="text-sm text-primary font-medium mb-3">Цена по программе акселератора</p>
              <p className="text-4xl md:text-5xl font-bold text-foreground">
                120 000 <span className="text-2xl text-muted-foreground font-medium">₽</span>
              </p>
              <div className="mt-4 inline-flex items-center rounded-lg bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
                Экономия 317 600 ₽ · −73%
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto rounded-2xl border-2 border-primary/30 bg-background p-8 md:p-10 text-center">
            <div className="mb-2">
              <span className="text-muted-foreground line-through mr-2">437 600 ₽</span>
              <span className="text-sm text-muted-foreground">по отдельности</span>
            </div>
            <p className="text-5xl md:text-6xl font-bold text-foreground mb-3">
              120 000 <span className="text-2xl md:text-3xl text-muted-foreground font-medium">₽</span>
            </p>
            <p className="text-primary font-medium mb-8">Если вы уже учились у нас — вычтем стоимость пройденных курсов*</p>

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

            <button type="button" onClick={() => setSignupOpen(true)} className="inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full">
              Записаться
            </button>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Войти можно в любой момент · Без потоков и дат старта
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              *Максимальная скидка 30%
            </p>
          </motion.div>
        </section>

        <PricingCalculator />

      </main>
      <FooterSection />

      <GetCourseWidgetDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        title="Записаться на акселератор"
        scriptId="5ea8f1369820bcde792d9c3030918857d7f9b0a2"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1590377"
      />
    </div>
  );
};

export default PricingPage;
