import d1 from "@/assets/dashboard-1.jpg";
import d2 from "@/assets/dashboard-2.jpg";
import d3 from "@/assets/dashboard-3.jpg";
import d4 from "@/assets/dashboard-4.jpg";
import d5 from "@/assets/dashboard-5.jpg";
import d6 from "@/assets/dashboard-6.jpg";
import d7 from "@/assets/dashboard-7.jpg";
import d8 from "@/assets/dashboard-8.jpg";
import d9 from "@/assets/dashboard-9.jpg";

export type Dashboard = {
  id: string;
  title: string;
  author: string;
  category: "Sales" | "Finance" | "Health" | "SaaS" | "Marketing" | "Logistics" | "HR" | "RealEstate" | "Support";
  tools: string[];
  image: string;
  accent: string;
  description: string;
  cohort: string;
};

export const dashboards: Dashboard[] = [
  { id: "1", title: "Pulse Revenue OS", author: "Алина Соколова", category: "Sales", tools: ["Tableau", "SQL", "dbt"], image: d1, accent: "from-violet-500 to-fuchsia-500", description: "Операционный дашборд продаж с прогнозом выручки на основе ML-модели и сегментацией клиентов.", cohort: "Cohort 12" },
  { id: "2", title: "Nebula Trade Desk", author: "Игорь Ким", category: "Finance", tools: ["Power BI", "Python"], image: d2, accent: "from-emerald-400 to-cyan-400", description: "Crypto-портфель в реальном времени: order book, market depth и алерты по волатильности.", cohort: "Cohort 11" },
  { id: "3", title: "Vital Rings", author: "Мария Петрова", category: "Health", tools: ["Looker", "BigQuery"], image: d3, accent: "from-orange-400 to-rose-500", description: "Персональная аналитика здоровья с heatmap тренировок и трендом восстановления.", cohort: "Cohort 13" },
  { id: "4", title: "Funnel Atlas", author: "Дмитрий Орлов", category: "SaaS", tools: ["Mixpanel", "Metabase"], image: d4, accent: "from-violet-400 to-indigo-500", description: "Cohort-анализ retention и MRR-роста для B2B SaaS на 50K+ пользователей.", cohort: "Cohort 12" },
  { id: "5", title: "Heatwave Ads", author: "Софья Лебедева", category: "Marketing", tools: ["Tableau", "GA4"], image: d5, accent: "from-pink-500 to-amber-400", description: "Геораспределение конверсий и ROI рекламных кампаний по 14 каналам.", cohort: "Cohort 10" },
  { id: "6", title: "Cargo Pulse", author: "Артём Беляев", category: "Logistics", tools: ["Power BI", "SAP"], image: d6, accent: "from-teal-400 to-sky-500", description: "Real-time трекинг 9000+ отправлений с прогнозом задержек.", cohort: "Cohort 11" },
  { id: "7", title: "People Mosaic", author: "Екатерина Власова", category: "HR", tools: ["Looker", "Workday"], image: d7, accent: "from-pink-400 to-violet-500", description: "People analytics: performance heatmap, diversity и org-структура с дрилл-даунами.", cohort: "Cohort 13" },
  { id: "8", title: "Estate Vault", author: "Михаил Громов", category: "RealEstate", tools: ["Tableau", "Snowflake"], image: d8, accent: "from-yellow-500 to-emerald-600", description: "Портфель из 240+ объектов: yield, market trends и сценарный анализ ROI.", cohort: "Cohort 9" },
  { id: "9", title: "Helpdesk Horizon", author: "Полина Зайцева", category: "Support", tools: ["Metabase", "Zendesk"], image: d9, accent: "from-cyan-400 to-blue-500", description: "SLA, CSAT и leaderboard агентов поддержки с алертами по аномалиям.", cohort: "Cohort 12" },
];
