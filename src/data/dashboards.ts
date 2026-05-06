export type Palette = "dark" | "light" | "green" | "yellow" | "blue" | "red";

export type Dashboard = {
  id: string;
  title: string;
  author: string;
  category: "Sales" | "Finance" | "Health" | "SaaS" | "Marketing" | "Logistics" | "HR" | "RealEstate" | "Support";
  tools: string[];
  image: string;
  /** Внешняя ссылка на интерактивную версию дашборда */
  link?: string;
  /** Цвет подложки карточки (если не задан — выбирается циклически) */
  palette?: Palette;
  accent: string;
  description: string;
  cohort: string;
};

const PALETTE_CYCLE: Palette[] = ["dark", "green", "light", "blue", "yellow", "red"];

const RAW: Omit<Dashboard, "palette">[] = [
  {
    id: "fin-health",
    title: "Финансовое здоровье",
    author: "Клуб Анонимных Аналитиков",
    category: "Finance",
    tools: ["Power BI"],
    image: "https://static.tildacdn.com/tild6130-3966-4836-a638-383162303535/__2026-01-16__151350.png",
    link: "http://files.alexkolokolov.com/ai/gallery/fin-health.html",
    accent: "from-emerald-400 to-cyan-400",
    description: "Отражает финансовое состояние Клуба Анонимных Аналитиков и ожидания аудитории, объединяя статистику, динамику изменений и эмоциональный фон.",
    cohort: "Cohort · 2026",
  },
  {
    id: "vebinar_dash",
    title: "Вебинар-аналитика",
    author: "Институт Нейро-Аналитики",
    category: "Marketing",
    tools: ["Tableau"],
    image: "https://static.tildacdn.com/tild3837-3835-4239-b233-316139343332/dash9.png",
    link: "http://files.alexkolokolov.com/ai/gallery/vebinar_dash.html",
    accent: "from-pink-500 to-amber-400",
    description: "Встроен блок моделирования: изменение входных параметров вручную пересчитывает все зависимые показатели.",
    cohort: "Cohort · 2026",
  },
  {
    id: "calc",
    title: "Калькулятор выручки",
    author: "Институт Нейро-Аналитики",
    category: "Sales",
    tools: ["Power BI"],
    image: "https://static.tildacdn.com/tild6431-6337-4264-b865-356365326162/dash7.png",
    link: "http://files.alexkolokolov.com/ai/gallery/calc.html",
    accent: "from-violet-500 to-fuchsia-500",
    description: "Дашборд для расчёта выручки и выплат с план-факт анализом, детализацией по менеджерам и сценарным прогнозом «что если».",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash7",
    title: "Дашборд для мед. клиники",
    author: "Юлия Драгинда",
    category: "Health",
    tools: ["Power BI"],
    image: "https://static.tildacdn.com/tild6135-6439-4430-b833-393265373862/dash_s7.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash7.html",
    accent: "from-orange-400 to-rose-500",
    description: "Управленческий обзор медклиники с ключевыми финансовыми и операционными показателями (выручка, визиты, конверсия, средний чек) и их динамикой по периодам и каналам.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash11",
    title: "Многостраничный отчёт",
    author: "Юлия Драгинда",
    category: "SaaS",
    tools: ["Tableau"],
    image: "https://static.tildacdn.com/tild3666-3266-4566-a337-373834353538/__2026-04-17__113924.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash11.html",
    accent: "from-violet-400 to-indigo-500",
    description: "Многостраничный аналитический отчёт, который последовательно раскрывает ключевые показатели и инсайты через интерактивную навигацию и визуальный сторителлинг данных.",
    cohort: "Cohort · 2026",
  },
  {
    id: "basketra",
    title: "BASKETRA · ритейл",
    author: "Студент ИНА",
    category: "Marketing",
    tools: ["Figma", "Tableau"],
    image: "https://static.tildacdn.com/tild3739-6639-4234-b635-613964653865/dash5.png",
    link: "http://files.alexkolokolov.com/ai/gallery/BASKETRA_MARKETING.html",
    accent: "from-pink-400 to-violet-500",
    description: "Сториборд по продуктовому ритейлу: аналитика выстроена как путь покупателя — от полки до чека. Нестандартные визуалы заменяют классические графики.",
    cohort: "Cohort · 2026",
  },
  {
    id: "finance_dash",
    title: "Финансовый дашборд",
    author: "Максим Павленко",
    category: "Finance",
    tools: ["Power BI"],
    image: "https://static.tildacdn.com/tild3333-3466-4230-b366-393466323931/__2026-03-11__174828.png",
    link: "http://files.alexkolokolov.com/ai/gallery/finance_dash.html",
    accent: "from-teal-400 to-sky-500",
    description: "Один график может показывать выручку, расходы или себестоимость — показатель выбирается в интерфейсе, визуализация перестраивается мгновенно.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash10",
    title: "Дашборд продаж",
    author: "Денис Беляев",
    category: "Sales",
    tools: ["Tableau"],
    image: "https://static.tildacdn.com/tild6665-3634-4863-b433-396261663665/__2026-03-11__175603.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash10.html",
    accent: "from-cyan-400 to-blue-500",
    description: "Интерактивный дашборд продаж с глобальным переключением метрик, картой городов и сценарным анализом «Что если?» для быстрого тестирования гипотез.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash13",
    title: "Аналитика как история",
    author: "Денис Беляев",
    category: "SaaS",
    tools: ["Tableau"],
    image: "https://static.tildacdn.com/tild6338-3961-4464-b333-636633343932/dash3.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash13.html",
    accent: "from-yellow-500 to-emerald-600",
    description: "Интерактивный отчёт, который превращает аналитику в визуальную историю: ключевые инсайты, необычные диаграммы и последовательное раскрытие данных.",
    cohort: "Cohort · 2026",
  },
  {
    id: "marketing_dash",
    title: "Дашборд по маркетингу",
    author: "Студент ИНА",
    category: "Marketing",
    tools: ["GA4", "Looker"],
    image: "https://static.tildacdn.com/tild3137-3665-4635-b661-373532383634/dash6.png",
    link: "http://files.alexkolokolov.com/ai/gallery/marketing_dash.html",
    accent: "from-pink-500 to-amber-400",
    description: "Интерактивный дашборд для быстрого анализа эффективности кампаний по KPI, ROI/CPS и географии подписчиков.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash12",
    title: "Солнечные панели · комикс",
    author: "Александр Ситник",
    category: "Logistics",
    tools: ["Figma"],
    image: "https://static.tildacdn.com/tild6437-3636-4438-b032-356336616166/__2026-03-11__181015.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash12.html",
    accent: "from-orange-400 to-rose-500",
    description: "Необычный аналитический отчёт в формате комикса, где показатели солнечных панелей и ключевые инсайты раскрываются через визуальный сторителлинг.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash3",
    title: "Строительные проекты",
    author: "Ландыш Хафизова",
    category: "RealEstate",
    tools: ["Power BI"],
    image: "https://static.tildacdn.com/tild3232-3539-4831-b362-343636353038/dash_s3.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash3.html",
    accent: "from-yellow-500 to-emerald-600",
    description: "Дашборд показывает контроль сроков через диаграмму Ганта и статус выполнения задач, обеспечивая прозрачное управление сроками и бюджетом проектов.",
    cohort: "Cohort · 2026",
  },
];

export const dashboards: Dashboard[] = RAW.map((d, i) => ({
  ...d,
  palette: PALETTE_CYCLE[i % PALETTE_CYCLE.length],
}));

export const PALETTES = PALETTE_CYCLE;
