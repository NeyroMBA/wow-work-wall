export type Palette = "dark" | "light" | "green" | "yellow" | "blue" | "red";

export type Category =
  | "Sales"
  | "Finance"
  | "Health"
  | "SaaS"
  | "Marketing"
  | "Logistics"
  | "HR"
  | "RealEstate"
  | "Support";

export type Dashboard = {
  id: string;
  title: string;
  author: string;
  /** Основная категория (для обратной совместимости со старыми компонентами) */
  category: Category;
  /** Все категории, к которым относится дашборд (для фильтров галереи) */
  categories: Category[];
  /** Фишки/особенности, отображаются как теги под картинкой над заголовком */
  features: string[];
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

type Raw = Omit<Dashboard, "palette" | "category"> & { categories: Category[]; palette?: Palette };

import dashBank from "@/assets/dash-bank.jpg";
import dashVinoteka from "@/assets/dash-vinoteka.jpg";
import dashArchive from "@/assets/dash-archive.jpg";

const RAW: Raw[] = [
  {
    id: "bank-churn",
    title: "Отток клиентов банка",
    author: "Александра Волкова",
    categories: ["Finance", "Marketing"],
    features: ["Дашборд + лонгрид", "Экспорт в PDF", "Claude"],
    tools: ["Claude"],
    palette: "red",
    image: dashBank,
    link: "https://files.alexkolokolov.com/ai/gallery/bank.html",
    accent: "from-rose-500 to-orange-400",
    description:
      "Аналитическое расследование оттока клиентов банка в стиле The New York Times: дашборд для изучения данных и презентация-лонгрид с инсайтами, контринтуитивными находками и планом приоритетов на квартал.",
    cohort: "Конкурс · 1 место",
  },
  {
    id: "vinoteka",
    title: "Аналитика винотеки",
    author: "Елена Михайлова",
    categories: ["Sales", "Finance"],
    features: ["Анализ что-если", "Сториборд", "Claude"],
    tools: ["Claude"],
    palette: "dark",
    image: dashVinoteka,
    link: "https://files.alexkolokolov.com/ai/gallery/vinoteka.html",
    accent: "from-fuchsia-500 to-amber-400",
    description:
      "Стратегический дашборд для защиты бизнес-плана винотеки: анализ «что если» по ценам и инфляции, загрузка данных несколькими способами с учётом незакрытых периодов и фирменная стилизация вплоть до анимированных пузырьков шампанского.",
    cohort: "Конкурс · 2 место",
  },
  {
    id: "archive",
    title: "Архив документов",
    author: "Виген Баблоян",
    categories: ["Logistics"],
    features: ["Оффлайн", "Запароленное обновление", "Claude"],
    tools: ["Claude"],
    palette: "blue",
    image: dashArchive,
    link: "https://files.alexkolokolov.com/ai/gallery/archive.html",
    accent: "from-slate-400 to-emerald-400",
    description:
      "HTML-дашборд для архивной компании с закрытым контуром: работает в старом Хроме без интернета и внешних библиотек. 10 000+ строк документов за 20 лет, поиск по комитету, сортировка и запароленное обновление.",
    cohort: "Конкурс",
  },

  {
    id: "fin-health",
    title: "Финансовое здоровье",
    author: "Анастасия Бачило",
    categories: ["Finance"],
    features: ["Переключатель", "Реальные данные", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild6130-3966-4836-a638-383162303535/__2026-01-16__151350.png",
    link: "http://files.alexkolokolov.com/ai/gallery/fin-health.html",
    accent: "from-emerald-400 to-cyan-400",
    description:
      "Отражает финансовое состояние Клуба Анонимных Аналитиков и ожидания аудитории, объединяя статистику, динамику изменений и эмоциональный фон.",
    cohort: "Cohort · 2026",
  },
  {
    id: "vebinar_dash",
    title: "Аналитика вебинаров",
    author: "Анна Зыкина",
    categories: ["Marketing"],
    features: ["Моделирование: что если", "Переключатель", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3137-3665-4635-b661-373532383634/dash6.png",
    link: "http://files.alexkolokolov.com/ai/gallery/vebinar_dash.html",
    accent: "from-pink-500 to-amber-400",
    description:
      "Встроен блок моделирования: изменение входных параметров вручную пересчитывает все зависимые показатели.",
    cohort: "Cohort · 2026",
  },
  {
    id: "calc",
    title: "Калькулятор выручки",
    author: "Лия Удовкина",
    categories: ["Finance", "Sales"],
    features: ["Переключатель", "Расчет показателей", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3837-3835-4239-b233-316139343332/dash9.png",
    link: "http://files.alexkolokolov.com/ai/gallery/calc.html",
    accent: "from-violet-500 to-fuchsia-500",
    description:
      "Дашборд для расчёта выручки и выплат с план-факт анализом, детализацией по менеджерам и сценарным прогнозом «что если».",
    cohort: "Cohort · 2026",
  },
  {
    id: "med-dash-lovable",
    title: "Медицинский дашборд",
    author: "Елена Шмаль",
    categories: ["Health", "Finance"],
    features: ["Боковое меню", "Саммари отчет", "Lovable"],
    tools: ["Lovable"],
    image: "https://static.tildacdn.com/tild6431-6337-4264-b865-356365326162/dash7.png",
    link: "https://med-dash-replicator.lovable.app/",
    accent: "from-sky-400 to-emerald-400",
    description:
      "Работа мед. клиники в динамике: от количества приёмов до выручки, включая ключевые показатели — повторяемость пациентов, загрузку специалистов.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash7",
    title: "Дашборд для мед. клиники",
    author: "Ирина Ивойлова",
    categories: ["Health", "Sales", "Finance"],
    features: ["Переключатель", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild6135-6439-4430-b833-393265373862/dash_s7.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash7.html",
    accent: "from-orange-400 to-rose-500",
    description:
      "Управленческий обзор медклиники с ключевыми финансовыми и операционными показателями (выручка, визиты, конверсия, средний чек) и их динамикой по периодам и каналам.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash11",
    title: "Годовой аналитический отчёт",
    author: "Юлия Драгинда",
    categories: ["Finance"],
    features: ["Data storytelling", "Инсайт-навигация", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3335-3135-4161-b736-636365663535/__2026-03-11__180907.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash11.html",
    accent: "from-violet-400 to-indigo-500",
    description:
      "Многостраничный аналитический отчёт, который последовательно раскрывает ключевые показатели и инсайты через интерактивную навигацию и визуальный сторителлинг данных.",
    cohort: "Cohort · 2026",
  },
  {
    id: "basketra",
    title: "Продуктовый ретейл",
    author: "Алиса Бышовец",
    categories: ["Marketing", "Sales"],
    features: ["Нестандартные визуализации", "Сториборд", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3666-3266-4566-a337-373834353538/__2026-04-17__113924.png",
    link: "http://files.alexkolokolov.com/ai/gallery/BASKETRA_MARKETING.html",
    accent: "from-pink-400 to-violet-500",
    description:
      "Сториборд по продуктовому ритейлу, где аналитика выстроена как путь покупателя — от полки до чека. Нестандартные визуалы заменяют классические графики.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash10",
    title: "Аналитика продаж",
    author: "Максим Павленко",
    categories: ["Sales"],
    features: ["Интерактивная карта", 'Анализ "Что если"', "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3333-3466-4230-b366-393466323931/__2026-03-11__174828.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash10.html",
    accent: "from-cyan-400 to-blue-500",
    description:
      "Интерактивный дашборд продаж с глобальным переключением метрик, картой городов и сценарным анализом «Что если?» для быстрого тестирования гипотез.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash13",
    title: "Сториборд",
    author: "Денис Беляев",
    categories: ["Marketing"],
    features: ["Нестандартный визуал", "Многостраничник", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild6665-3634-4863-b433-396261663665/__2026-03-11__175603.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash13.html",
    accent: "from-yellow-500 to-emerald-600",
    description:
      "Интерактивный отчет, который превращает аналитику в визуальную историю: ключевые инсайты, необычные диаграммы и последовательное раскрытие данных.",
    cohort: "Cohort · 2026",
  },
  {
    id: "marketing_dash",
    title: "Дашборд по маркетингу",
    author: "Анастасия Бачило",
    categories: ["Marketing"],
    features: ["Необычный визуал", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild6338-3961-4464-b333-636633343932/dash3.png",
    link: "http://files.alexkolokolov.com/ai/gallery/marketing_dash.html",
    accent: "from-pink-500 to-amber-400",
    description:
      "Интерактивный дашборд для быстрого анализа эффективности кампаний по KPI, ROI/CPS и географии подписчиков.",
    cohort: "Cohort · 2026",
  },
  {
    id: "finance_dash",
    title: "Финансовый дашборд",
    author: "Елена Шмаль",
    categories: ["Finance"],
    features: ["Переключатель", "Автообновление", "Chat GPT"],
    tools: ["Chat GPT"],
    image: "https://static.tildacdn.com/tild3739-6639-4234-b635-613964653865/dash5.png",
    link: "http://files.alexkolokolov.com/ai/gallery/finance_dash.html",
    accent: "from-teal-400 to-sky-500",
    description:
      "Один график может показывать выручку, расходы или себестоимость — показатель выбирается в интерфейсе, визуализация перестраивается мгновенно.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash12",
    title: "Комикс-отчет",
    author: "Александр Ситник",
    categories: ["Marketing"],
    features: ["Инсайт-подсказки", "Нестандартный дизайн", "Сториборд", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild6437-3636-4438-b032-356336616166/__2026-03-11__181015.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash12.html",
    accent: "from-orange-400 to-rose-500",
    description:
      "Необычный аналитический отчёт в формате комикса, где показатели солнечных панелей и ключевые инсайты раскрываются через визуальный сторителлинг.",
    cohort: "Cohort · 2026",
  },
  {
    id: "student_dash3",
    title: "Строительные проекты",
    author: "Ландыш Хафизова",
    categories: ["Logistics", "Finance"],
    features: ["Переключатель", "Диаграмма Ганта", "Claude"],
    tools: ["Claude"],
    image: "https://static.tildacdn.com/tild3232-3539-4831-b362-343636353038/dash_s3.png",
    link: "http://files.alexkolokolov.com/ai/gallery/student_dash3.html",
    accent: "from-yellow-500 to-emerald-600",
    description:
      "Дашборд показывает контроль сроков через диаграмму Ганта и статус выполнения задач, обеспечивая прозрачное управление сроками и бюджетом проектов.",
    cohort: "Cohort · 2026",
  },
];

export const dashboards: Dashboard[] = RAW.map((d, i) => ({
  ...d,
  category: d.categories[0],
  palette: d.palette ?? PALETTE_CYCLE[i % PALETTE_CYCLE.length],
}));

export const PALETTES = PALETTE_CYCLE;
