import { useCallback, useEffect, useRef, useState } from "react";
import inaLogo from "@/assets/security/ina-logo-dark.svg.asset.json";
import annaPhoto from "@/assets/security/anna-zykina.png.asset.json";
import alexeyPhoto from "@/assets/security/kolokolov-mugshot.png.asset.json";
import alexanderPhoto from "@/assets/security/komachenko-mugshot.png.asset.json";
import FooterSection from "@/components/FooterSection";
import {
  Skull, Bug, Ghost, EyeOff, Bot, Wifi, Lock, KeyRound, AlertTriangle,
  ShieldAlert, Fingerprint, Mail, CreditCard, MessageSquareWarning,
  Shield, Calendar, Clock, ArrowRight, Check, X,
  Briefcase, Users, FileCheck,
  Brain, MessageSquare, Search, Gauge, Compass, ScanLine,
} from "lucide-react";

const THREAT_ICONS = [
  Skull, Bug, Ghost, EyeOff, Bot, Wifi, Lock, KeyRound, AlertTriangle,
  ShieldAlert, Fingerprint, Mail, CreditCard, MessageSquareWarning,
];

const SECURITY_ASSET_HOST = "https://wow-work-wall.lovable.app";
const securityAssetUrl = (url: string) =>
  url.startsWith("/__l5e/assets-v1/") ? `${SECURITY_ASSET_HOST}${url}` : url;

type Threat = { id: number; x: number; y: number; Icon: typeof Skull; rot: number; dur: number; drift: number };

type WidgetKind = "free" | "paid" | "program";

const WIDGETS: Record<WidgetKind, { scriptId: string; widgetId: string; title: string }> = {
  free: { scriptId: "a84d198fd2eb6572171a694ea0a3c15ee690fe97", widgetId: "1625901", title: "Записаться бесплатно" },
  paid: { scriptId: "dcb4a9a04ce9ec3da0298c4fb79fe9c44518c2ec", widgetId: "1625900", title: "Тариф с проверкой" },
  program: { scriptId: "53c56496ada947cb2bbc32e41b4bf2231b7e145e", widgetId: "1624157", title: "Получить программу" },
};

function openWidget(kind: WidgetKind) {
  window.dispatchEvent(new CustomEvent("open-widget", { detail: kind }));
}

export default function Security() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "security");
    return () => document.documentElement.removeAttribute("data-theme");
  }, []);
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <Hero />
      <RealityToday />
      <ForWhom />
      <Program />
      <Pricing />
      <Skills />
      <Finale />
      <FooterSection />
      <WidgetModal />
    </main>
  );
}

function WidgetModal() {
  const [kind, setKind] = useState<WidgetKind | null>(null);
  const openCountRef = useRef(0);
  const [openId, setOpenId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const onOpen = (e: Event) => {
      openCountRef.current += 1;
      setOpenId(openCountRef.current);
      setLoading(true);
      setKind((e as CustomEvent).detail as WidgetKind);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setKind(null);
    window.addEventListener("open-widget", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-widget", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    if (kind) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [kind]);

  if (!kind) return null;
  const w = WIDGETS[kind];
  const scriptSrc = `https://insba.getcourse.ru/pl/lite/widget/script?id=${w.widgetId}?p=${openId}`;
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><base target="_parent"><style>html,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;}body{padding:20px;background:#F3F3F3;}</style></head><body><script id="${w.scriptId}" src="${scriptSrc}"><\/script></body></html>`;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setKind(null)}
    >
      <div
        className="relative text-black w-full max-w-xl h-[85vh] max-h-[720px] shadow-2xl overflow-hidden"
        style={{ background: "#F3F3F3" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setKind(null)}
          aria-label="Закрыть"
          className="absolute top-2 right-2 z-20 w-9 h-9 flex items-center justify-center bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors"
        >
          <X size={18} />
        </button>
        <iframe
          key={`${kind}-${openId}`}
          title={w.title}
          srcDoc={srcDoc}
          onLoad={() => setTimeout(() => setLoading(false), 600)}
          className="relative z-0 w-full h-full border-0"
          style={{ background: "#F3F3F3" }}
        />
        {loading && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-gray-500 pointer-events-none"
            style={{ background: "#F3F3F3" }}
          >
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            <div className="font-mono text-xs tracking-widest uppercase">Форма загружается</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const idRef = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const Icon = THREAT_ICONS[Math.floor(Math.random() * THREAT_ICONS.length)];
      const t: Threat = {
        id: idRef.current++,
        x: rect.left + Math.random() * rect.width,
        y: rect.bottom - 20,
        Icon,
        rot: (Math.random() - 0.5) * 360,
        dur: 4 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 200,
      };
      setThreats((p) => [...p, t].slice(-25));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const burst = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const list: Threat[] = [];
    for (let i = 0; i < 10; i++) {
      const Icon = THREAT_ICONS[Math.floor(Math.random() * THREAT_ICONS.length)];
      list.push({
        id: idRef.current++,
        x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
        y: rect.top + rect.height / 2,
        Icon,
        rot: (Math.random() - 0.5) * 720,
        dur: 3 + Math.random() * 2,
        drift: (Math.random() - 0.5) * 500,
      });
    }
    setThreats((p) => [...p, ...list].slice(-40));
  }, []);

  useEffect(() => {
    if (!threats.length) return;
    const t = setTimeout(() => setThreats((p) => p.slice(10)), 7000);
    return () => clearTimeout(t);
  }, [threats]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-background flex flex-col">
      <div className="absolute inset-0 scanlines pointer-events-none z-30 opacity-30" />
      <div className="absolute inset-0 noise pointer-events-none z-20" />
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-danger to-transparent pointer-events-none z-20"
        style={{ animation: "sec-scanline 7s linear infinite", boxShadow: "0 0 20px hsl(var(--danger))" }}
      />

      <header className="relative z-40 px-6 md:px-10 py-5 flex items-center justify-between font-mono text-xs tracking-widest uppercase text-muted-foreground">
        <a href="#" className="flex items-center gap-3 text-foreground">
          <img src={securityAssetUrl(inaLogo.url)} alt="Институт нейроаналитики" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex gap-6">
          <a href="#whom" className="hover:text-foreground transition-colors">Для кого</a>
          <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
        </div>
        <a href="#pricing" className="text-foreground border border-border px-3 py-1.5 hover:border-primary transition-colors">Записаться</a>
      </header>

      <div className="fixed inset-0 pointer-events-none z-40">
        {threats.map((t) => (
          <div
            key={t.id}
            className="absolute"
            style={{
              left: t.x,
              top: t.y,
              animation: `sec-float-up ${t.dur}s cubic-bezier(.2,.6,.4,1) forwards`,
              transform: `translateX(${t.drift}px) rotate(${t.rot}deg)`,
            }}
          >
            <t.Icon className="text-danger/70" size={20 + Math.random() * 14} strokeWidth={1.4} />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="font-mono text-[11px] md:text-xs tracking-[0.35em] text-danger mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-danger" />
              ТРЁХДНЕВНЫЙ ПРАКТИКУМ
            </div>

            <h1 className="font-display font-bold text-[11vw] md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tighter">
              <span className="block md:hidden">
                Техника<br />безопасности<br />при работе с ИИ <span className="text-danger">☠️</span>
              </span>
              <span className="hidden md:block">
                Техника безопасности<br />при работе с ИИ <span className="text-danger">☠️</span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-danger/60 pl-4">
              Практикум для аналитиков и менеджеров, которые хотят работать с данными в ИИ без тревоги.
            </p>

            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <a
                href="#pricing"
                onClick={burst}
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-bold tracking-wide hover:bg-primary/90 transition-colors"
              >
                Занять место <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> 7—9 июля</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 19:00 МСК</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <ShieldOrb />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShieldOrb() {
  const orbiters = [
    { Icon: Mail, label: "Фишинг", angle: 0 },
    { Icon: KeyRound, label: "Утечка ключей", angle: 60 },
    { Icon: EyeOff, label: "Слив данных", angle: 120 },
    { Icon: Bot, label: "Дипфейк", angle: 180 },
    { Icon: CreditCard, label: "Мошенники", angle: 240 },
    { Icon: Fingerprint, label: "PII", angle: 300 },
  ];
  return (
    <div className="relative w-full aspect-square max-w-[440px] ml-auto">
      <div className="absolute inset-0 rounded-full" style={{ animation: "sec-pulse-danger 3s ease-in-out infinite" }} />
      {[0.95, 0.75, 0.55].map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 m-auto rounded-full border border-danger/25"
          style={{
            width: `${s * 100}%`, height: `${s * 100}%`,
            top: `${((1 - s) / 2) * 100}%`, left: `${((1 - s) / 2) * 100}%`,
            animation: `sec-flicker ${3 + i}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ animation: "sec-spin 32s linear infinite" }}>
        {orbiters.map((o, i) => {
          const rad = (o.angle * Math.PI) / 180;
          const r = 46;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              style={{ left: `${x}%`, top: `${y}%`, animation: `sec-spin 32s linear infinite reverse` }}
            >
              <div className="w-9 h-9 border border-danger/50 bg-background/80 backdrop-blur flex items-center justify-center">
                <o.Icon size={16} className="text-danger" strokeWidth={1.6} />
              </div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground whitespace-nowrap">{o.label}</span>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 m-auto flex items-center justify-center">
        <div className="relative w-[38%] aspect-square">
          <div className="absolute inset-0 bg-primary/10 border border-primary/40 rotate-45" style={{ boxShadow: "0 0 60px -5px hsl(var(--primary))" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Shield size={40} className="text-primary" strokeWidth={1.4} />
            <span className="font-mono text-[10px] tracking-widest text-primary/80 uppercase">AI · SAFE</span>
          </div>
        </div>
      </div>
      {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((p) => (
        <span key={p} className={`absolute ${p} w-4 h-4 border-danger/60`} />
      ))}
    </div>
  );
}

function RealityToday() {
  const screens = [
    { tag: "СЦЕНАРИЙ 01", title: "Ваш голос звонит вашей маме", body: "30 секунд аудио из сторис — и нейросеть просит у неё 80 000 рублей. Вашим голосом.", Icon: Bot },
    { tag: "СЦЕНАРИЙ 02", title: "ChatGPT слил ваш бриф", body: "Вставили клиентский договор в чат «упростить язык». Теперь он в тренировочной выборке — навсегда.", Icon: EyeOff },
    { tag: "СЦЕНАРИЙ 03", title: "Письмо от вашего CEO", body: "Идеальный тон, ваш внутренний сленг, корректная подпись. Только это не он — это промпт по LinkedIn.", Icon: Mail },
  ];
  const stats: [string, string][] = [
    ["98%", "сотрудников вставляли данные в чат-ботов"],
    ["3 сек", "нужно дипфейку, чтобы скопировать ваш голос"],
    ["×17", "рост атак с использованием LLM за 2025"],
    ["0", "вторых шансов после слитого пароля"],
  ];
  return (
    <section className="relative bg-background border-t border-border/50 min-h-screen flex flex-col px-6 md:px-10 py-14 overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto w-full flex flex-col flex-1">
        <div className="max-w-5xl">
          <div className="font-mono text-xs tracking-[0.4em] text-muted-foreground mb-4">// ПРОВЕРКА_РЕАЛЬНОСТИ</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Это не «Чёрное зеркало» — это <span className="text-danger">сегодня</span>.
          </h2>
        </div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-px bg-border/40 flex-1">
          {screens.map((s) => (
            <article key={s.tag} className="bg-card p-6 md:p-7 flex flex-col relative group hover:bg-background transition-colors">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-danger to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-xs tracking-widest text-foreground border border-border/60 px-2 py-1">{s.tag}</div>
                <s.Icon className="text-muted-foreground" size={30} strokeWidth={1.2} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              <div className="mt-5 pt-4 border-t border-border/40 font-mono text-[10px] tracking-widest text-muted-foreground/60">
                СТАТУС: <span className="text-danger">КОМПРОМЕТИРОВАНО</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40">
          {stats.map(([n, t]) => (
            <div key={t} className="bg-card p-5 md:p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-none">{n}</div>
              <div className="text-xs md:text-sm text-muted-foreground leading-snug">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  const groups = [
    { Icon: Briefcase, title: "Руководителям", body: "Хотите внедрить ИИ в отделе, но боитесь, что сотрудники сольют клиентскую базу в первый же день." },
    { Icon: Users, title: "Специалистам", body: "Нужны внятные правила: что можно вставлять в чат-бота, а что — нет. Без 80-страничного регламента." },
    { Icon: FileCheck, title: "Малому бизнесу", body: "Нет своего ИБ-отдела. Нужна понятная инструкция, как работать с ИИ без рисков и без найма CISO." },
  ];
  return (
    <section id="whom" className="relative bg-background border-t border-border/50 py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-4xl">
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-4">// ДЛЯ_КОГО</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
            Если вы или коллеги<br className="hidden md:block" /> используете нейронки для рабочих задач — <span className="text-primary">это для вас</span>.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
          {groups.map((g) => (
            <div key={g.title} className="bg-card p-7 flex flex-col gap-4">
              <g.Icon className="text-primary" size={32} strokeWidth={1.4} />
              <h3 className="text-xl font-bold">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Program() {
  const days = [
    {
      day: "ДЕНЬ 01", date: "7 июля · 19:00 МСК", title: "Анатомия угроз",
      topics: [
        "Узнаете, как угоняют голос, пароли и переписку в личном контуре",
        "Разберёте атаки в корпоративном контуре: сливы через чат-боты и дипфейки CEO",
        "Потренируетесь находить промпт-инъекции и уязвимые места в своих процессах",
      ],
    },
    {
      day: "ДЕНЬ 02", date: "8 июля · 19:00 МСК", title: "От страха к контролю",
      topics: [
        "Поймёте, какие методы шифрования нужны при работе с ИИ — без математики",
        "Обезличите реальную зарплатную ведомость в рамках практики",
        "Заберёте чек-лист «Светофор данных»: что можно отдавать нейросетям, а что нет",
      ],
    },
    {
      day: "ДЕНЬ 03", date: "9 июля · 19:00 МСК", title: "Перспективы",
      topics: [
        "Разберём ваши домашние задания и типичные ошибки в прямом эфире",
        "Посмотрим реальные кейсы ИТ-проектов, сделанных с помощью ИИ",
        "Уйдёте с пошаговым планом внедрения безопасного ИИ в свою команду",
      ],
    },
  ];
  return (
    <section id="program" className="relative py-20 md:py-32 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">Программа практикума</h2>
            <div className="font-mono text-sm text-muted-foreground max-w-xs mt-4">
              Все эфиры записываются. Шаблоны и регламенты — в чате интенсива на следующий день.
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-px bg-border/40">
          {days.map((d) => (
            <article key={d.day} className="bg-card p-7 md:p-9">
              <div className="flex items-center justify-between font-mono text-xs tracking-widest text-primary mb-6">
                <span>{d.day}</span>
                <span className="text-muted-foreground flex items-center gap-1"><Calendar size={12} /> онлайн</span>
              </div>
              <div className="text-muted-foreground text-sm flex items-center gap-2 mb-6">
                <Clock size={14} /> {d.date}
              </div>
              <h3 className="text-2xl font-bold mb-6 leading-tight">{d.title}</h3>
              <ul className="space-y-3">
                {d.topics.map((t, i) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed">
                    <span className="font-mono text-primary shrink-0">0{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-6">// СПИКЕРЫ</div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Александр Команченко", role: "Эксперт по ИБ", photo: securityAssetUrl(alexanderPhoto.url), bio: "В информационной безопасности с 2008 года. Не «безопасник-запретитель», а переводчик между бизнесом и ИБ." },
              { name: "Анна Зыкина", role: "Директор по маркетингу ИБА", photo: securityAssetUrl(annaPhoto.url), bio: "Работает «за троих» с помощью ИИ. Практик по обезличиванию и безопасной работе с данными." },
              { name: "Алексей Колоколов", role: "Основатель ИБА", photo: securityAssetUrl(alexeyPhoto.url), bio: "Международный эксперт по BI-дашбордам. 16 лет в аналитике и визуализации данных, автор книг." },
            ].map((s) => (
              <div key={s.name} className="border border-border bg-card flex flex-col">
                <img
                  src={s.photo}
                  alt={s.name}
                  className="w-full aspect-[4/5] object-cover grayscale"
                />
                <div className="p-6 md:p-8">
                  <div className="font-bold text-lg">{s.name}</div>
                  <div className="text-xs text-muted-foreground mb-4">{s.role}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const freeFeatures = [
    "Доступ к живым эфирам 7—9 июля",
    "Разбор кейсов и живые демо атак",
    "Участие в Q&A со спикерами",
  ];
  const paidFeatures = [
    "Всё из бесплатного тарифа",
    "Записи всех трёх эфиров",
    "Презентации, артефакты и шаблоны",
    "Чек-лист «Светофор данных»",
    "Выборочная проверка домашних заданий",
    "Сертификат участника за практику",
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-32 px-6 border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-4">// ТАРИФЫ</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
            Выберите формат участия.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border p-8 flex flex-col">
            <div className="font-mono text-xs tracking-widest text-muted-foreground mb-3">УЧАСТНИК В ЭФИРЕ</div>
            <div className="flex items-baseline gap-2 mb-6">
              <div className="text-5xl font-bold">0 ₽</div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="text-primary shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openWidget("free")}
              className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3.5 text-sm font-bold tracking-wide transition-colors"
            >
              Записаться
            </button>
          </div>

          <div className="bg-card border border-primary/60 p-8 flex flex-col relative bg-primary/[0.03]">
            <div className="absolute -top-3 left-8 bg-primary text-primary-foreground font-mono text-[10px] px-2 py-1 tracking-widest">
              РЕКОМЕНДУЕМ
            </div>
            <div className="font-mono text-xs tracking-widest text-primary mb-3">ПРАКТИК С ПРОВЕРКОЙ</div>
            <div className="flex items-baseline gap-2 mb-6">
              <div className="text-5xl font-bold text-primary">490 ₽</div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {paidFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="text-primary shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openWidget("paid")}
              className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3.5 text-sm font-bold tracking-wide transition-colors"
            >
              Купить за 490 ₽
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { Icon: ScanLine, t: "Сканировать промпт глазами безопасника", d: "Видеть, какие данные нельзя отправлять — за 2 секунды до отправки." },
    { Icon: Compass, t: "Выбирать ИИ под задачу", d: "Понимать, когда ChatGPT, когда Claude, когда локальная модель, а когда — Excel." },
    { Icon: Brain, t: "Обезличивать данные по 152-ФЗ", d: "Готовить рабочие файлы так, чтобы их можно было безопасно отдать нейросети." },
    { Icon: MessageSquare, t: "Писать промпты с guardrails", d: "Конструкции, которые не дают модели выболтать конфиденциальное." },
    { Icon: Gauge, t: "Оценивать риск любого ИИ-инструмента", d: "Своя шкала «зелёный / жёлтый / красный» вместо «давайте спросим у ИБ»." },
    { Icon: Search, t: "Собирать мини-дашборд на своих данных", d: "От сырых цифр до готового артефакта — в безопасном контуре, без утечек." },
  ];
  return (
    <section className="relative py-20 md:py-32 px-6 border-t border-border/50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15), transparent 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-14 max-w-4xl">
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-4">// НАВЫКИ</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] break-words hyphens-auto">
            Шаблоны заберёте сразу.<br />
            <span className="text-primary">Навыки</span> — останутся навсегда.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Что вы научитесь делать сами — без подсказок, без чек-листа под рукой.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
          {skills.map((s, i) => (
            <div key={s.t} className="bg-card p-7 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <s.Icon className="text-primary" size={30} strokeWidth={1.4} />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60">НАВЫК_{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-lg font-bold leading-tight mt-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finale() {
  const rows = [
    { label: "Отношение к ИИ", before: "Боитесь сами загружать файлы — вдруг это ПДн и утечка.", after: "Знаете, что можно, а что нельзя. Отдаёте в ИИ спокойно." },
    { label: "Команда", before: "Сотрудники тайком закидывают в ChatGPT договоры и клиентские базы.", after: "У каждой роли — свой набор промптов с guardrails. Никакой партизанщины." },
    { label: "Инструменты", before: "Безопасники блокируют новые ИИ «на всякий случай» — квартал согласований.", after: "ИБ подписала список разрешённых инструментов. Никаких квартальных встреч." },
    { label: "Данные", before: "Никто не знает, где уже случилась утечка. Инцидент разбирают постфактум.", after: "Обезличиваете данные до отправки. По 152-ФЗ, без риска штрафа." },
    { label: "Скорость", before: "Рутина съедает день. ИИ используют «по чуть-чуть» и с оглядкой.", after: "Рутина закрыта нейросетями. Маркетинг ускорился вдвое. Конкуренты — нет." },
  ];

  return (
    <section className="relative py-24 md:py-40 px-6 border-t border-border/50 overflow-hidden bg-background">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-6">// СИСТЕМА_СТАБИЛЬНА</div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02]">
            Через две недели <br />
            ваша команда работает с ИИ. <span className="text-primary">Спокойно.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Что изменится в отделе за три вечера интенсива — по пунктам, без магии и без 80-страничного регламента.
          </p>
        </div>

        <div className="mt-14 hidden md:block border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[220px_1fr_1fr] border-b border-border/50">
            <div className="p-6 flex items-center font-mono text-xs tracking-widest text-muted-foreground">
              &nbsp;
            </div>
            <div className="p-6 border-l border-border/50 flex items-center gap-3">
              <AlertTriangle className="text-danger shrink-0" size={18} />
              <div className="font-mono text-xs tracking-widest text-danger">ДО ИНТЕНСИВА</div>
            </div>
            <div className="p-6 border-l border-border/50 bg-primary/[0.06] flex items-center gap-3">
              <Check className="text-primary shrink-0" size={18} strokeWidth={2.5} />
              <div className="font-mono text-xs tracking-widest text-primary">ПОСЛЕ ИНТЕНСИВА</div>
            </div>
          </div>

          {rows.map((r, idx) => (
            <div
              key={r.label}
              className={`grid grid-cols-[220px_1fr_1fr] ${idx !== rows.length - 1 ? "border-b border-border/50" : ""}`}
            >
              <div className="p-6 flex items-start font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {r.label}
              </div>
              <div className="p-6 border-l border-border/50 text-sm text-muted-foreground leading-relaxed">
                {r.before}
              </div>
              <div className="p-6 border-l border-border/50 bg-primary/[0.04] text-sm text-foreground leading-relaxed">
                {r.after}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 md:hidden flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.label} className="border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {r.label}
              </div>
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-danger shrink-0" size={16} />
                  <div className="font-mono text-[10px] tracking-widest text-danger">ДО ИНТЕНСИВА</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.before}</p>
              </div>
              <div className="p-4 bg-primary/[0.04]">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="text-primary shrink-0" size={16} strokeWidth={2.5} />
                  <div className="font-mono text-[10px] tracking-widest text-primary">ПОСЛЕ ИНТЕНСИВА</div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{r.after}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button type="button" onClick={() => openWidget("free")} className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-bold tracking-wide hover:bg-primary/90 transition-colors">
            Занять место <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button type="button" onClick={() => openWidget("paid")} className="inline-flex items-center gap-3 border border-border hover:border-primary text-foreground px-8 py-4 font-bold tracking-wide transition-colors">
            Взять тариф с проверкой
          </button>
        </div>
        <div className="mt-6 text-center font-mono text-xs text-muted-foreground tracking-widest">
          7—9 июля · онлайн · записи и материалы — только в платном тарифе
        </div>
      </div>
    </section>
  );
}
