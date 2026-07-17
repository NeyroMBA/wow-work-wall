import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar, Clock, ArrowRight, Layers, Route, CheckCircle2,
  Brain, Wrench, LayoutGrid, KeyRound, Lightbulb, Hammer, Rocket,
  MessageSquare, Users, Presentation,
} from "lucide-react";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";
import CaseCard from "@/components/accelerator2/CaseCard";
import GetCourseWidgetDialog from "@/components/accelerator2/GetCourseWidgetDialog";
import { cases } from "@/data/accelerator2/cases";

const schedule = [
  { day: "Вторник", short: "Вт", time: "09:00" },
  { day: "Среда", short: "Ср", time: "18:00" },
  { day: "Четверг", short: "Чт", time: "13:00" },
  { day: "Суббота", short: "Сб", time: "10:00" },
];

const startCards = [
  {
    icon: Layers,
    title: "Приходите с любой стадией проекта",
    desc: "От общей идеи и первых вопросов до работающего MVP, который нужно улучшить или подготовить к запуску.",
  },
  {
    icon: Calendar,
    title: "Выбирайте удобные сессии",
    desc: "Коворкинги проходят четыре раза в неделю. Можно посещать все встречи или подключаться тогда, когда нужна помощь.",
  },
  {
    icon: Route,
    title: "Уходите со следующим шагом",
    desc: "Проверьте идею, найдите решение проблемы, получите обратную связь и зафиксируйте, что делать дальше.",
  },
];

const steps = [
  { n: "01", title: "Приходите с задачей", desc: "Идея, техническая проблема, макет или рабочая версия." },
  { n: "02", title: "Коротко обозначаете цель", desc: "Рассказываете, что хотите сделать и где сейчас застряли." },
  { n: "03", title: "Работаете над проектом", desc: "Самостоятельно, с куратором или другими участниками." },
  { n: "04", title: "Фиксируете результат", desc: "Решение, обратная связь и понятный следующий шаг." },
];

const helpAreas = [
  { icon: Brain, title: "Выбор ИИ и модели", desc: "Claude, GPT, Qwen, Perplexity и другие инструменты под конкретную задачу." },
  { icon: Wrench, title: "Техническая реализация", desc: "Архитектура, интеграции, ошибки и настройка рабочей среды." },
  { icon: LayoutGrid, title: "Интерфейс и логика", desc: "Структура продукта, пользовательский сценарий, дизайн и подача результата." },
  { icon: KeyRound, title: "Доступы и сервисы", desc: "VPN, подписки, необходимые аккаунты и первоначальная настройка." },
];

const levels = [
  { icon: Lightbulb, title: "Только идея", desc: "Поможем сформулировать задачу, сузить первую версию и понять, с чего начать." },
  { icon: Hammer, title: "Собираю первую версию", desc: "Разберём структуру, инструменты и сложности, которые мешают двигаться дальше." },
  { icon: Rocket, title: "Уже есть проект", desc: "Поможем улучшить архитектуру, интерфейс, автоматизацию или подготовить следующую версию." },
];

const demoPoints = [
  "Показать результат, даже если проект ещё не идеален.",
  "Получить взгляд со стороны и конкретные рекомендации.",
  "Увидеть подходы других участников и найти новые идеи.",
];

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.32 },
};

const SectionShell = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section id={id} className="py-[52px] md:py-[72px] lg:py-24 bg-background">
    <div className="container mx-auto px-6">{children}</div>
  </section>
);

const PrimaryCTA = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center justify-center px-10 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity ${className}`}
    style={{ height: 64 }}
  >
    Записаться на гостевой визит
  </button>
);

const CtaNote = () => (
  <p className="mt-3 text-sm md:text-base text-muted-foreground">Бесплатно · Ни к чему не обязывает</p>
);

const CoworkingsPage = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const openSignup = () => setSignupOpen(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div data-theme="accelerator" className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* 1. Hero */}
      <section className="pt-24 md:pt-28 pb-[52px] md:pb-[72px] lg:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[60fr_40fr] gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1
                className="font-bold text-foreground"
                style={{ fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.1, maxWidth: 760 }}
              >
                Начните работать над проектом уже на&nbsp;ближайшем коворкинге
              </h1>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.45, marginTop: 24, maxWidth: 700 }}
              >
                Приходите с&nbsp;идеей, черновиком или работающей системой. Куратор и&nbsp;участники помогут определить следующий шаг, разобраться со&nbsp;сложностью и&nbsp;продвинуть проект дальше.
              </p>
              <div style={{ marginTop: 32 }}>
                <PrimaryCTA onClick={openSignup} className="w-full sm:w-auto" />
                <CtaNote />
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-7"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} strokeWidth={1.8} className="text-primary" />
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Коворкинги каждую неделю</h2>
              </div>
              <ul className="divide-y divide-border rounded-xl bg-background border border-border overflow-hidden">
                {schedule.map((s) => (
                  <li key={s.short} className="flex items-baseline justify-between px-4 py-3">
                    <span className="text-sm md:text-base text-muted-foreground">{s.short}</span>
                    <span className="text-lg md:text-xl font-semibold text-foreground tabular-nums">{s.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock size={14} strokeWidth={1.8} /> Московское время
              </p>
              <div className="mt-5 rounded-xl bg-background border border-border px-4 py-3 text-sm md:text-base text-foreground">
                Демо-сессии&nbsp;— раз в&nbsp;две недели
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Начать можно сразу */}
      <SectionShell>
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Начать можно сразу</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Коворкинг&nbsp;— это рабочая среда, в&nbsp;которую можно включиться с&nbsp;первых дней.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {startCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.06 }}
                className="p-6 rounded-xl border border-border bg-background flex flex-col"
              >
                <Icon size={26} strokeWidth={1.6} className="text-primary mb-4" />
                <h3 className="text-xl md:text-[22px] font-semibold text-foreground mb-2 leading-snug">{c.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </SectionShell>

      {/* 3. Как проходит коворкинг */}
      <SectionShell>
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Как проходит коворкинг</h2>
        </motion.div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-4 md:gap-3 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.05 }}
              className="relative p-5 rounded-xl border border-border bg-background"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-primary font-mono font-semibold text-lg">{s.n}</span>
                {i < steps.length - 1 && (
                  <ArrowRight size={16} className="hidden md:block text-primary/40 absolute -right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 leading-snug">{s.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeIn} className="max-w-5xl mx-auto mt-8 rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 text-center text-base text-foreground">
          Это не&nbsp;классический формат вебинаров: основное время вы&nbsp;работаете над собственной задачей.
        </motion.div>
      </SectionShell>

      {/* 4. Персональная консультация */}
      <SectionShell>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Нужна точечная помощь? Перейдите с&nbsp;куратором в&nbsp;отдельную комнату
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Во&nbsp;время коворкинга можно перейти с&nbsp;куратором в&nbsp;отдельную онлайн-комнату и&nbsp;персонально разобрать свой проект. Куратор поможет найти причину проблемы, выбрать подходящий инструмент и&nbsp;определить оптимальный способ реализации.
            </p>
          </motion.div>

          <motion.div {...fadeIn} className="mt-10 grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Users size={20} strokeWidth={1.8} />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider">Шаг 1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Общий коворкинг</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Работа над собственным проектом.</p>
            </div>
            <div className="flex items-center justify-center text-primary">
              <ArrowRight size={28} className="rotate-90 md:rotate-0" />
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <MessageSquare size={20} strokeWidth={1.8} />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider">Шаг 2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Отдельная комната с&nbsp;куратором</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Персональный разбор задачи.</p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {helpAreas.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: i * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-background flex gap-4"
                >
                  <Icon size={22} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-foreground mb-1">{h.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center text-center">
            <PrimaryCTA onClick={openSignup} className="w-full sm:w-auto" />
          </div>
        </div>
      </SectionShell>

      {/* 5. С каким уровнем */}
      <SectionShell>
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">С&nbsp;каким уровнем можно приходить</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {levels.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.div
                key={l.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.06 }}
                className="p-6 rounded-xl border border-border bg-background flex flex-col"
              >
                <Icon size={24} strokeWidth={1.7} className="text-primary mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-snug">{l.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{l.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </SectionShell>

      {/* 6. Полное расписание */}
      <SectionShell>
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Выберите удобное время</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Можно приходить на&nbsp;все встречи или выбирать только удобные сессии.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {schedule.map((s, i) => (
            <motion.div
              key={s.day}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.05 }}
              className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center"
            >
              <p className="text-sm md:text-base text-muted-foreground mb-1">{s.day}</p>
              <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums leading-none">{s.time}</p>
              <p className="text-xs text-muted-foreground mt-2">МСК</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* 8. Демо-сессии */}
      <SectionShell>
        <motion.div {...fadeIn} className="max-w-5xl mx-auto rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <Presentation size={26} strokeWidth={1.7} className="text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Раз в&nbsp;две недели&nbsp;— демо-сессия</h2>
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Участники показывают текущую версию проекта, получают вопросы и&nbsp;обратную связь, видят решения других участников и&nbsp;определяют следующую итерацию.
          </p>
          <ul className="mt-6 grid md:grid-cols-3 gap-4">
            {demoPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-base text-foreground leading-relaxed rounded-xl bg-background border border-border p-4">
                <CheckCircle2 size={18} strokeWidth={2} className="text-primary shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </SectionShell>

      {/* 9. Кейсы */}
      <SectionShell>
        <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Посмотрите, какие проекты собирают участники
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Реальные системы для производства, аналитики, управления, продаж и&nbsp;других рабочих задач.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cases.slice(0, 3).map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/accelerator#cases"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
          >
            Смотреть кейсы участников <ArrowRight size={18} />
          </Link>
        </div>
      </SectionShell>

      {/* 10. Финальный CTA */}
      <SectionShell>
        <motion.div {...fadeIn} className="max-w-4xl mx-auto rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Приходите на&nbsp;ближайший коворкинг
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Посмотрите, как проходит работа, расскажите о&nbsp;своей задаче и&nbsp;получите первый ориентир по&nbsp;проекту.
          </p>
          <div className="flex flex-col items-center">
            <PrimaryCTA onClick={openSignup} className="w-full sm:w-auto" />
            <CtaNote />
          </div>
        </motion.div>
      </SectionShell>

      <FooterSection />

      <GetCourseWidgetDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        title="Записаться на гостевой визит"
        scriptId="5ea8f1369820bcde792d9c3030918857d7f9b0a2"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1590377"
      />
    </div>
  );
};

export default CoworkingsPage;
