import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Crown, Wrench, ShoppingCart, Users, GraduationCap, Wrench as WrenchIcon, FolderKanban, TrendingUp,
  Brain, Bot, Code2, MousePointerClick, BarChart3,
  UserCheck, Video, MessageCircle, CheckCircle2, Database, Globe, LineChart, Lock, ChevronDown, Clock, ArrowRight,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/accelerator2/Navbar";
import FooterSection from "@/components/accelerator2/FooterSection";
import CaseCard from "@/components/accelerator2/CaseCard";
import GetCourseWidgetDialog from "@/components/accelerator2/GetCourseWidgetDialog";
import CourseDialog from "@/components/accelerator2/CourseDialog";
import MethodologyStairs from "@/components/accelerator2/MethodologyStairs";
import ReviewsSection from "@/components/accelerator2/ReviewsSection";
import { courseDetails } from "@/data/accelerator2/courseDetails";
import { cases } from "@/data/accelerator2/cases";

const problems = [
  "Вы знакомы с нейросетями, но не нашли им применения на работе",
  "Вроде есть потенциал, но не знаете с чего начать",
  "В серьёзных задачах получилась фигня, сложно в одиночку довести до ума",
  "Нет доверия к ИИ, останавливают вопросы безопасности",
];

const tasks = [
  { icon: ShoppingCart, label: "Закупки и управление запасами" },
  { icon: Users, label: "Взаимоотношения с клиентами" },
  { icon: GraduationCap, label: "Обучение и аттестация персонала" },
  { icon: WrenchIcon, label: "Инженерные и логистические задачи" },
  { icon: FolderKanban, label: "Управление проектами, коммуникациями" },
  { icon: TrendingUp, label: "Стыковка узких мест в маркетинге и продажах" },
];

const courses = [
  { icon: Brain, name: "Нейросети", desc: "Базовые принципы работы с LLM, промптинг и применение в задачах" },
  { icon: Bot, name: "Агенты", desc: "Автономные ИИ-агенты, оркестрация и интеграция в процессы" },
  { icon: Code2, name: "Питон", desc: "Программирование на Python для автоматизации и обработки данных" },
  { icon: MousePointerClick, name: "Курсор", desc: "Cursor IDE: от установки до запуска ИТ-системы" },
  { icon: BarChart3, name: "Аналитика", desc: "Работа с данными, дашборды и визуализация" },
];

const support = [
  {
    icon: UserCheck,
    label: "Сопровождение куратора",
    desc: "Поддержка для любого уровня подготовки: выбрать нейросети и решить технические вопросы, при необходимости настроить доступы, VPN и подписки.",
  },
  {
    icon: Video,
    label: "Онлайн-коворкинги, разборы ваших проектов",
    cta: { label: "Как проходят коворкинги", href: "/coworkings" },
    desc: "Подключаться можно ещё до начала обучения. Четыре сессии в неделю: приходите на все или выбирайте удобные, получайте обратную связь и помощь по проекту.",
  },
  {
    icon: MessageCircle,
    label: "Персональный подход",
    desc: "Помогаем подобрать подходящие ИИ-инструменты под вашу задачу и рекомендуем, с какой моделью лучше работать.",
    tools: ["Claude", "GPT", "Qwen", "Perplexity"],
  },
];

const skills = [
  { icon: Bot, label: "Агенты" },
  { icon: Database, label: "Базы данных" },
  { icon: Globe, label: "Веб-приложения" },
  { icon: LineChart, label: "Аналитика" },
  { icon: Lock, label: "Безопасность" },
];

const results = [
  "Автоматизировать процессы в своей команде",
  "Оказывать такие услуги на фрилансе",
  "Будете востребованным консультантом для топ-менеджеров и собственников",
];

const faqs = [
  { q: "Какого масштаба проекты я смогу делать?", a: "Масштаб — средний-малый бизнес или подразделение в крупной компании. Условный ориентир — до 100 пользователей. Но зависит ещё и от объёма данных, технических деталей." },
  { q: "Как проходят коворкинги?", a: "Регулярные онлайн-встречи, где вы вместе с куратором и группой разбираете реальные задачи, ошибки и архитектуру ваших проектов." },
  { q: "А что если я чайник?", a: "Программа рассчитана на людей без технического бэкграунда. Мы начинаем с базовых принципов и постепенно ведём к сборке полноценных систем." },
  { q: "Надо ли уметь программировать?", a: "Нет. Мы учим управлять ИИ и собирать решения без ручного написания кода. Python и Cursor — инструменты, а не требования." },
];

const StairsIllustration = () => {
  const steps = [
    { tread: [40, 250, 110, 250], riser: [110, 250, 110, 210] },
    { tread: [110, 210, 180, 210], riser: [180, 210, 180, 170] },
    { tread: [180, 170, 250, 170], riser: [250, 170, 250, 130] },
    { tread: [250, 130, 320, 130], riser: [320, 130, 320, 90] },
    { tread: [320, 90, 390, 90], riser: [390, 90, 390, 50] },
  ];
  const hatching = [
    [45, 245, 105, 245], [50, 240, 100, 240], [55, 235, 95, 235],
    [115, 205, 175, 205], [120, 200, 170, 200], [125, 195, 165, 195],
    [185, 165, 245, 165], [190, 160, 240, 160], [195, 155, 235, 155],
    [255, 125, 315, 125], [260, 120, 310, 120], [265, 115, 305, 115],
    [325, 85, 385, 85], [330, 80, 380, 80], [335, 75, 375, 75],
  ];
  const silhouette = "M40 250 L110 250 L110 210 L180 210 L180 170 L250 170 L250 130 L320 130 L320 90 L390 90 L390 50";

  return (
    <svg viewBox="0 0 440 280" className="w-full h-auto max-w-md mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" className="text-muted-foreground" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.1 }} d={silhouette} fill="none" opacity={0.6} />
        {steps.map((s, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}>
            <line x1={s.tread[0]} y1={s.tread[1]} x2={s.tread[2]} y2={s.tread[3]} opacity={0.5} />
            <line x1={s.riser[0]} y1={s.riser[1]} x2={s.riser[2]} y2={s.riser[3]} opacity={0.5} />
          </motion.g>
        ))}
        {hatching.map(([x1, y1, x2, y2], i) => (
          <motion.line key={`h-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.04, duration: 0.3 }} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" opacity={0.25} />
        ))}
        <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.8 }} x1="30" y1="260" x2="420" y2="260" strokeWidth="0.5" opacity={0.2} />
        <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.8 }} x1="30" y1="260" x2="30" y2="40" strokeWidth="0.5" opacity={0.2} />
      </g>
    </svg>
  );
};

const Section = ({ id, title, highlight, children, intro }: {
  id?: string; title?: React.ReactNode; highlight?: string; intro?: string; children: React.ReactNode;
}) => (
  <section id={id} className="py-10 relative bg-background">
    <div className="container mx-auto px-6">
      {title && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title} {highlight && <span>{highlight}</span>}
          </h2>
          {intro && <p className="text-muted-foreground text-lg leading-relaxed">{intro}</p>}
        </motion.div>
      )}
      {children}
    </div>
  </section>
);

const AcceleratorPage = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [casesExpanded, setCasesExpanded] = useState(false);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    // wait for sections to mount
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 100);
      }
    };
    tryScroll();
  }, [hash]);

  return (
    <div data-theme="accelerator" className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                ИИ-Акселератор
              </h1>
              <p
                className="text-foreground text-left"
                style={{
                  fontSize: "clamp(20px, 1.9vw, 24px)",
                  lineHeight: 1.25,
                  fontWeight: 400,
                  maxWidth: 620,
                  marginTop: 24,
                }}
              >
                Программа по&nbsp;созданию решений для ваших рабочих и&nbsp;бизнес-задач&nbsp;— от&nbsp;идеи до&nbsp;запуска
              </p>

              <div style={{ marginTop: 18, maxWidth: 620 }}>
                <h3
                  className="text-foreground text-left"
                  style={{ fontSize: "clamp(20px, 1.9vw, 24px)", lineHeight: 1.2, fontWeight: 700 }}
                >
                  Работайте быстрее. Успевайте больше.
                </h3>

                <div
                  className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden"
                  style={{ marginTop: 18 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-border sm:divide-y-0 sm:divide-x sm:divide-border">
                    <div className="flex items-start gap-3 p-5">
                      <Clock size={22} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-foreground" style={{ fontSize: 18, fontWeight: 600 }}>
                          Экономия времени
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.35, marginTop: 6 }}
                        >
                          До&nbsp;2–5 раз быстрее выполнение типовых задач
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-5">
                      <TrendingUp size={22} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-foreground" style={{ fontSize: 18, fontWeight: 600 }}>
                          Повышение эффективности
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.35, marginTop: 6 }}
                        >
                          Меньше рутины и&nbsp;ручной работы
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2
                className="text-muted-foreground leading-relaxed"
                style={{ marginTop: 24, marginBottom: 32, fontSize: 18 }}
              >
                3 месяца интенсивной практики
              </h2>
              <a href="#buy" className="inline-flex items-center px-10 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
                Записаться
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <StairsIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="problem" title="В чём" highlight="проблема">
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <motion.div key={p} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-5 rounded-xl border border-border bg-background">
              <p className="text-foreground text-base leading-relaxed">{p}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="audience" title="Для" highlight="кого" intro="Вы работаете с людьми и процессами. Пользуетесь ИТ-системами, но не пишете код. И не должны.">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl border border-primary/30 bg-background">
            <div className="flex items-center gap-3 mb-4">
              <Crown size={22} strokeWidth={1.8} className="text-primary shrink-0" />
              <h3 className="text-lg font-semibold text-foreground">Руководитель</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-base leading-relaxed">
              <li>• Вы точно знаете, какой результат нужен бизнесу</li>
              <li>• Устали тратить бюджет на подрядчиков и штатных разработчиков, которые объясняют на «птичьем языке», почему всё так сложно и долго</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="p-6 rounded-xl border border-primary/30 bg-background">
            <div className="flex items-center gap-3 mb-4">
              <Wrench size={22} strokeWidth={1.8} className="text-primary shrink-0" />
              <h3 className="text-lg font-semibold text-foreground">Специалист</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-base leading-relaxed">
              <li>• Вы досконально знаете свой процесс и понимаете, как он должен работать</li>
              <li>• Не хотите ждать, пока IT до вас доберётся, и слушать про ограничения 1С или Битрикса — хотите воплотить свою специфику, а не подстраиваться</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section id="tasks" title="Какие задачи уже реально делать с" highlight="ИИ" intro="Гибридные задачи, когда процесс живёт в нескольких системах. Когда вообще системы нет — учёт ведётся в табличках.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {tasks.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div key={t.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-background">
                <Icon size={22} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                <p className="text-base text-foreground leading-relaxed">{t.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cases.slice(0, 3).map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {casesExpanded && (
            <motion.div
              key="extra-cases"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mt-4">
                {cases.slice(3, 6).map((c) => (
                  <CaseCard
                    key={c.id}
                    caseData={
                      c.id === "mining-fleet" && !c.authorRole
                        ? { ...c, authorRole: "Менеджер проектов" }
                        : c
                    }
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCasesExpanded((v) => !v)}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {casesExpanded ? "Свернуть" : "Посмотреть ещё"}
            <ChevronDown
              size={20}
              className="transition-transform"
              style={{ transform: casesExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </Section>

      <Section id="solution" title="Какое решение мы" highlight="предлагаем" intro="Программа акселерации: учебные курсы + практика с ментором">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-mono font-medium text-primary uppercase tracking-wider mb-6">Доступ к курсам</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
            {courses.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-xl border border-border hover:border-primary/30 transition-colors bg-background">
                  <Icon size={24} strokeWidth={1.8} className="text-primary mb-4" />
                  <h3 className="text-base font-semibold text-foreground mb-2">{c.name}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                  <button type="button" onClick={() => setActiveCourse(c.name)} className="text-sm text-primary font-medium hover:underline">
                    Подробнее →
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto items-stretch">
            {support.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex flex-col gap-3 p-5 rounded-xl border border-primary/20 bg-primary/5 h-full">
                  <div className="flex items-start gap-3">
                    <Icon size={22} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-base text-foreground leading-relaxed font-medium">{s.label}</p>
                  </div>
                  {s.cta && (
                    <Link
                      to={s.cta.href}
                      className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg border border-primary/40 bg-background text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {s.cta.label}
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  )}
                  {s.desc && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  )}
                  {s.tools && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {s.tools.map((t) => (
                        <span key={t} className="inline-flex items-center px-2.5 py-1 rounded-md border border-primary/20 bg-background text-xs font-medium text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto p-8 rounded-2xl border-2 border-primary/30 bg-background text-center mb-16" id="buy">
            <p className="text-sm text-muted-foreground mb-2">Стоимость</p>
            <p className="text-5xl font-bold text-foreground mb-6">
              <span className="text-2xl text-muted-foreground font-medium">от</span> 7 000 <span className="text-2xl text-muted-foreground font-medium">₽ / мес.</span>
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Если вы уже проходили у нас курсы по ИИ — стоимость зачтётся.
            </p>
            <p className="text-sm text-primary font-medium mb-8">
              Такого предложения за такую цену ни у кого нет
            </p>
            <Link to="/pricing" className="inline-block px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all w-full">
              Смотреть расчёт стоимости
            </Link>
          </motion.div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Вы получите опыт, будете разбираться в темах
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((s) => {
                const Icon = s.icon;
                return (
                  <span key={s.label} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary font-medium text-base">
                    <Icon size={18} strokeWidth={1.8} />
                    {s.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Как вы будете собирать проекты
          </h3>
        </div>
        <MethodologyStairs />
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl border border-primary/30 bg-primary/5 mb-8 text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Вы сможете в одни руки делать настоящие ИТ-проекты.
            </p>
            <p className="text-muted-foreground">
              Локальные задачи — за часы. Серьёзные проекты — за недели.
            </p>
          </motion.div>

          <div className="space-y-3 mb-12">
            {results.map((r, i) => (
              <motion.div key={r} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background">
                <CheckCircle2 size={22} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-foreground leading-relaxed">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>




      {/* Чтобы вернуть блок с отзывами — раскомментируйте строку ниже */}
      {/* <ReviewsSection /> */}

      <Section id="faq" title="Частые" highlight="вопросы">
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <FooterSection />

      <GetCourseWidgetDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        title="Записаться на акселератор"
        scriptId="5ea8f1369820bcde792d9c3030918857d7f9b0a2"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1590377"
      />



      <CourseDialog
        open={activeCourse !== null}
        onOpenChange={(o) => !o && setActiveCourse(null)}
        name={activeCourse ?? ""}
        detail={activeCourse ? courseDetails[activeCourse] ?? null : null}
      />
    </div>
  );
};

export default AcceleratorPage;
