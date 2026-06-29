import { useState, useEffect, useRef, useCallback } from "react";
import metricMapImg from "@/assets/metric-map.png";
import dashboardImg from "@/assets/dashboard-screenshot.png.asset.json";
import trainerImg from "@/assets/trainer-photo.png.asset.json";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1160px] px-5 md:px-8", className)}>{children}</div>;
}

function SectionHead({ title, lead }: { title: string; lead?: React.ReactNode }) {
  return (
    <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1.05fr_.95fr] md:items-end">
      <div>
        <h2 className="text-pravda-ink text-[clamp(30px,4.4vw,54px)] font-extrabold leading-[1.04] tracking-[-0.045em]">
          {title}
        </h2>
      </div>
      {lead && <div className="text-pravda-text text-[17px] leading-[1.5]">{lead}</div>}
    </div>
  );
}

/* ---------- Schemas ---------- */

function BrokenChainSchema() {
  const mobileNodes = [
    { label: "Стратегические KPI", where: "в презентациях", x: 28, y: 18 },
    { label: "Отчёты", where: "в Excel", x: 78, y: 14 },
    { label: "Реальные данные", where: "1С, CRM, базы", x: 28, y: 82 },
    { label: "Правила расчёта", where: "в головах у людей", x: 72, y: 86 },
    { label: "Решения", where: "в чатах и блокнотах", x: 50, y: 50 },
  ];

  const desktopNodes = [
    { label: "Стратегические KPI", where: "в презентациях", x: 12, y: 72 },
    { label: "Отчёты", where: "в Excel", x: 30, y: 20 },
    { label: "Реальные данные", where: "1С, CRM, базы", x: 48, y: 55 },
    { label: "Правила расчёта", where: "в головах у людей", x: 72, y: 22 },
    { label: "Решения", where: "в чатах и блокнотах", x: 90, y: 62 },
  ];

  const mobileLines = [
    [50, 50, 28, 18],
    [50, 50, 78, 14],
    [50, 50, 28, 82],
    [50, 50, 72, 86],
    [28, 18, 78, 14],
  ];

  const desktopLines = [
    [12, 72, 30, 20],
    [30, 20, 48, 55],
    [48, 55, 72, 22],
    [72, 22, 90, 62],
    [48, 55, 90, 62],
  ];

  type Connector = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    key: string;
  };

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [connectors, setConnectors] = useState<{ left: Connector | null; right: Connector | null }>({
    left: null,
    right: null,
  });

  const measure = useCallback(() => {
    const mobile = mobileRef.current;
    const desktop = desktopRef.current;
    const container = mobile && mobile.offsetWidth > 0 ? mobile : desktop && desktop.offsetWidth > 0 ? desktop : null;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const edge = (label: string, side: "left" | "right") => {
      const el = container.querySelector(`[data-label="${label}"]`) as HTMLElement | null;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const left = ((r.left - cRect.left) / cRect.width) * 100;
      const width = (r.width / cRect.width) * 100;
      const top = ((r.top - cRect.top) / cRect.height) * 100;
      const height = (r.height / cRect.height) * 100;
      return { x: side === "left" ? left : left + width, y: top + height / 2 };
    };

    const kpiL = edge("Стратегические KPI", "left");
    const realL = edge("Реальные данные", "left");
    const reportsR = edge("Отчёты", "right");
    const rulesR = edge("Правила расчёта", "right");

    setConnectors({
      left: kpiL && realL ? { x1: kpiL.x, y1: kpiL.y, x2: realL.x, y2: realL.y, key: "left" } : null,
      right: reportsR && rulesR ? { x1: reportsR.x, y1: reportsR.y, x2: rulesR.x, y2: rulesR.y, key: "right" } : null,
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (mobileRef.current) ro.observe(mobileRef.current);
    if (desktopRef.current) ro.observe(desktopRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const gridBg = (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.5]"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--pravda-line)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--pravda-line)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );

  const schemaStyles = (
    <style>{`
      @keyframes pravda-node-float {
        0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
        25% { transform: translate(-50%, -50%) translate(2px, -2px); }
        50% { transform: translate(-50%, -50%) translate(-2px, 1px); }
        75% { transform: translate(-50%, -50%) translate(1px, 2px); }
      }
      .pravda-node-float {
        animation-name: pravda-node-float;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      @keyframes pravda-line-pulse {
        0% { opacity: 0.15; }
        8% { opacity: 1; }
        22% { opacity: 1; }
        30% { opacity: 0.15; }
        100% { opacity: 0.15; }
      }
      .pravda-line-pulse {
        animation-name: pravda-line-pulse;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
    `}</style>
  );

  const renderNodes = (nodes: typeof mobileNodes) =>
    nodes.map((n, i) => (
      <div
        key={i}
        data-label={n.label}
        className={cn(
          "absolute rounded-[12px] border border-pravda-line bg-pravda-bg px-3 py-2 shadow-[0_8px_22px_rgba(0,0,0,0.05)] w-max -translate-x-1/2 -translate-y-1/2 pravda-node-float",
        )}
        style={{
          left: `${n.x}%`,
          top: `${n.y}%`,
          animationDuration: `${4 + i * 0.8}s`,
          animationDelay: `${i * 0.6}s`,
        }}
      >
        <div className="whitespace-nowrap text-[13px] font-bold leading-tight tracking-[-0.02em] text-pravda-ink">
          {n.label}
        </div>
        <div className="mt-0.5 whitespace-nowrap text-[12px] text-pravda-red">{n.where}</div>
      </div>
    ));

  const renderLines = (lines: number[][], offset = 0) =>
    lines.map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        className="text-pravda-line-strong pravda-line-pulse"
        style={{
          animationDuration: "10s",
          animationDelay: `${(i + offset) * 2}s`,
        }}
      />
    ));

  const renderQuestionLine = (c: Connector | null, index = 0) => {
    if (!c) return null;
    return (
      <line
        key={c.key}
        x1={c.x1}
        y1={c.y1}
        x2={c.x2}
        y2={c.y2}
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        className="text-pravda-line-strong pravda-line-pulse"
        style={{
          animationDuration: "10s",
          animationDelay: `${5 + index}s`,
        }}
      />
    );
  };

  const renderQuestionMarker = (c: Connector | null) => {
    if (!c) return null;
    const mx = (c.x1 + c.x2) / 2;
    const my = (c.y1 + c.y2) / 2;
    return (
      <div
        key={c.key}
        className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-pravda-line-strong bg-pravda-bg text-[13px] font-bold leading-none text-pravda-ink shadow-sm"
        style={{ left: `${mx}%`, top: `${my}%` }}
      >
        ?
      </div>
    );
  };

  return (
    <>
      {schemaStyles}
      {/* Mobile / tablet — square */}
      <div ref={mobileRef} className="relative aspect-square w-full overflow-hidden rounded-[20px] border border-pravda-line bg-pravda-bg lg:hidden">
        {gridBg}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderLines(mobileLines)}
          {renderQuestionLine(connectors.left, 0)}
          {renderQuestionLine(connectors.right, 1)}
        </svg>
        {renderQuestionMarker(connectors.left)}
        {renderQuestionMarker(connectors.right)}
        {renderNodes(mobileNodes)}
      </div>

      {/* Desktop — compact landscape, full page width */}
      <div ref={desktopRef} className="relative hidden aspect-[2.2/1] w-full overflow-hidden rounded-[20px] border border-pravda-line bg-pravda-bg lg:block">
        {gridBg}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderLines(desktopLines)}
          {renderQuestionLine(connectors.left, 0)}
          {renderQuestionLine(connectors.right, 1)}
        </svg>
        {renderQuestionMarker(connectors.left)}
        {renderQuestionMarker(connectors.right)}
        {renderNodes(desktopNodes)}
      </div>
    </>
  );
}

function MetricMapSchema() {
  const ring: Array<{ label: string; sub: string; angle: number }> = [
    { label: "Затраты", sub: "цена процесса", angle: -90 },
    { label: "Диагностика", sub: "где проблема", angle: -18 },
    { label: "Действия", sub: "что делать", angle: 54 },
    { label: "Тщеславие", sub: "вычёркиваем", angle: 126 },
    { label: "Драйверы", sub: "что влияет", angle: 198 },
  ];
  const cx = 50;
  const cy = 50;
  const r = 36;
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[18px] border border-pravda-line bg-pravda-soft/60">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {ring.map((n, i) => {
          const a = (n.angle * Math.PI) / 180;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="0.3"
              strokeDasharray={n.label === "Тщеславие" ? "1 1.3" : "0"}
              className={n.label === "Тщеславие" ? "text-pravda-red/60" : "text-pravda-line-strong"}
            />
          );
        })}
      </svg>
      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pravda-ink bg-pravda-bg px-4 py-3 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">центр</div>
        <div className="text-[15px] font-extrabold tracking-[-0.02em] text-pravda-ink">Результат</div>
      </div>
      {ring.map((n, i) => {
        const a = (n.angle * Math.PI) / 180;
        const x = 50 + Math.cos(a) * 40;
        const y = 50 + Math.sin(a) * 40;
        const isVanity = n.label === "Тщеславие";
        return (
          <div
            key={i}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-[10px] border bg-pravda-bg px-2.5 py-1.5 text-center shadow-sm",
              isVanity ? "border-pravda-red/50" : "border-pravda-line-strong",
            )}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={cn(
                "text-[13px] font-bold leading-none tracking-[-0.01em]",
                isVanity ? "text-pravda-red line-through" : "text-pravda-ink",
              )}
            >
              {n.label}
            </div>
            <div className="mt-1 text-[10px] text-pravda-muted">{n.sub}</div>
          </div>
        );
      })}
    </div>
  );
}

function DashboardMock() {
  const kpis = [
    { l: "Выручка", v: "2,50 млн ₽", d: "+8%" },
    { l: "Клиенты", v: "24", d: "+3" },
    { l: "Средний чек", v: "104 тыс ₽", d: "−4%" },
    { l: "Повторные", v: "20 / 24", d: "83%" },
  ];
  return (
    <div className="rounded-[18px] border border-pravda-line bg-pravda-bg p-3">
      <div className="mb-2 flex items-center justify-between border-b border-pravda-line pb-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-pravda-muted">Дашборд · Клиенты</div>
        <div className="flex gap-1">
          {["Д", "Нед", "Мес", "Кв"].map((p, i) => (
            <span
              key={p}
              className={cn(
                "rounded-md border px-1.5 py-0.5 text-[10px]",
                i === 2 ? "border-pravda-ink bg-pravda-ink text-pravda-bg" : "border-pravda-line text-pravda-muted",
              )}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-[10px] border border-pravda-line bg-pravda-soft/60 p-2">
            <div className="text-[10px] uppercase tracking-wider text-pravda-muted">{k.l}</div>
            <div className="mt-1 text-[15px] font-extrabold tracking-[-0.02em] text-pravda-ink">{k.v}</div>
            <div
              className={cn(
                "mt-0.5 text-[10px] font-semibold",
                k.d.startsWith("−") ? "text-pravda-red" : "text-pravda-green",
              )}
            >
              {k.d}
            </div>
          </div>
        ))}
      </div>
      {/* chart */}
      <div className="mt-2 rounded-[10px] border border-pravda-line bg-pravda-bg p-2">
        <div className="mb-1 flex items-center justify-between text-[10px] text-pravda-muted">
          <span>Динамика</span>
          <span className="flex gap-2"><span>● Визиты</span><span className="text-pravda-green">● Клиенты</span></span>
        </div>
        <svg viewBox="0 0 200 60" className="h-16 w-full">
          <polyline fill="none" stroke="currentColor" strokeWidth="1.3" className="text-pravda-ink"
            points="0,40 25,32 50,36 75,22 100,28 125,18 150,24 175,12 200,16" />
          <polyline fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 2" className="text-pravda-green"
            points="0,50 25,48 50,44 75,42 100,38 125,36 150,30 175,28 200,22" />
        </svg>
      </div>
      {/* table */}
      <div className="mt-2 overflow-hidden rounded-[10px] border border-pravda-line">
        <table className="w-full border-collapse text-[11px]">
          <thead className="bg-pravda-soft/70 text-pravda-muted">
            <tr>
              {["№", "Авто", "Клиент", "Статус", "План", "Факт"].map((h) => (
                <th key={h} className="border-b border-pravda-line px-2 py-1 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-pravda-ink">
            {[
              ["18660", "Mazda CX-5", "новый", "в работе", "188", "96"],
              ["18696", "Skoda Octavia", "повторный", "закрыт", "156", "156"],
              ["18492", "Toyota Camry", "новый", "закрыт", "142", "142"],
            ].map((row, i) => (
              <tr key={i} className="border-t border-pravda-line">
                {row.map((c, j) => (
                  <td key={j} className="px-2 py-1">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentsSchema() {
  // see below
  const tree = [
    { g: "Реестр метрик", items: ["KPI · skApprove", "KPI · skClaims", "KPI · skOsago"] },
    { g: "Карты метрик", items: ["Карта директора", "Карта отдела продаж"] },
    { g: "Дашборды", items: ["Пульт управления", "Клиенты", "Загрузка"] },
    { g: "Источники", items: ["1С: Бухгалтерия", "Bitrix24 · CRM", "Excel · Бюджет 2026"] },
  ];
  return (
    <div className="grid gap-3 rounded-[18px] border border-pravda-line bg-pravda-bg p-3 md:grid-cols-[1fr_1.1fr]">
      <div className="rounded-[12px] border border-pravda-line bg-pravda-soft/60 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">Структура</div>
        <div className="mt-2 space-y-3">
          {tree.map((b) => (
            <div key={b.g}>
              <div className="text-[12px] font-bold text-pravda-ink">{b.g}</div>
              <ul className="mt-1 space-y-0.5 border-l border-pravda-line pl-3">
                {b.items.map((it) => (
                  <li key={it} className="text-[11px] text-pravda-text">— {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-[12px] border border-pravda-line bg-pravda-bg p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">ИИ-агент</div>
        <div className="rounded-[10px] border border-pravda-line bg-pravda-soft/50 p-2 font-mono text-[12px] text-pravda-ink">
          {">"} построй график динамики и воронку продаж по физлицам
        </div>
        <div className="text-pravda-muted">↓</div>
        <div className="rounded-[10px] border border-pravda-ink bg-pravda-ink p-2 text-[12px] text-pravda-bg">
          Дашборд воронки и динамики продаж по направлению «Физлица» готов.
        </div>
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          {["визиты 50", "клиенты 24", "повторные 20"].map((s) => (
            <div key={s} className="rounded-md border border-pravda-line bg-pravda-soft/60 px-1.5 py-1 text-center text-[10px] text-pravda-text">
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sparkline({ up, red, seed = 0 }: { up: boolean; red?: boolean; seed?: number }) {
  const stroke = red ? "#c74432" : "#28714c";
  // smooth oscillating curve with overall trend
  const W = 60;
  const H = 20;
  const N = 32;
  const trend = up ? -1 : 1; // y axis inverted in SVG
  const startY = up ? 15 : 5;
  const endY = up ? 4 : 16;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const baseY = startY + (endY - startY) * t;
    const osc =
      Math.sin(t * Math.PI * 3 + seed) * 2.2 +
      Math.sin(t * Math.PI * 6 + seed * 1.7) * 1.1 +
      Math.cos(t * Math.PI * 4.5 + seed * 0.6) * 0.8;
    const x = t * W;
    const y = Math.max(1.5, Math.min(H - 1.5, baseY + osc * (1 + 0.1 * trend)));
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  // smooth via Catmull-Rom-ish: use polyline, looks fine and curvy enough at this density
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-8 w-16 shrink-0" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts.join(" ")}
      />
    </svg>
  );
}

function DashboardWithAgent() {
  const kpis = [
    { l: "Выручка", v: "12,4 млн ₽", d: "+3%", up: true },
    { l: "Маржа", v: "18,2%", d: "−4,1 п.п.", up: false },
    { l: "Средний чек", v: "84 тыс ₽", d: "−6%", up: false },
    { l: "Заказы", v: "148", d: "+9%", up: true },
  ];
  return (
    <div className="rounded-[18px] border border-pravda-line bg-pravda-bg p-3">
      <div className="grid grid-cols-2 gap-1.5">
        {kpis.map((k, i) => (
          <div
            key={k.l}
            className={cn(
              "flex items-center justify-between gap-1.5 rounded-[10px] border p-2",
              k.l === "Маржа"
                ? "border-pravda-red/50 bg-pravda-red/5"
                : "border-pravda-line bg-pravda-soft/60",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-pravda-muted">{k.l}</div>
              <div className="mt-1 whitespace-nowrap text-[13px] font-extrabold tracking-[-0.02em] text-pravda-ink sm:text-[15px]">{k.v}</div>
              <div
                className={cn(
                  "mt-0.5 text-[10px] font-semibold",
                  k.up ? "text-pravda-green" : "text-pravda-red",
                )}
              >
                {k.d}
              </div>
            </div>
            <Sparkline up={k.up} red={!k.up} seed={i * 1.3} />
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-pravda-line pt-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">
            ИИ-агент · разбор отклонения
          </div>
        </div>
        <div className="space-y-2">
          <div className="rounded-[10px] border border-pravda-line bg-pravda-soft/60 px-3 py-2 font-mono text-[12px] text-pravda-ink">
            {">"} почему просела маржа в ноябре?
          </div>
          <div className="rounded-[10px] border border-pravda-line bg-pravda-soft/60 px-3 py-2 text-[12px] leading-[1.5] text-pravda-ink">
            Маржа упала на 4,1 п.п. Два драйвера:
            <div className="mt-2 space-y-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span>· Рост скидок в сегменте «Опт»</span>
                <span className="font-mono text-pravda-red">−2,4 п.п.</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span>· Рост закупочной цены, поставщик A-12</span>
                <span className="font-mono text-pravda-red">−1,7 п.п.</span>
              </div>
            </div>
            <div className="mt-2 text-pravda-muted">
              Открыть карту метрики «Маржа» → действия →
              <span className="text-pravda-ink"> пересмотр прайса опта, тендер по поставщику.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TruthHubSchema() {
  const items = [
    { t: "Стратегические KPI", s: "что измеряем" },
    { t: "Метрики и формулы", s: "как считаем" },
    { t: "Оперативные отчёты", s: "что показываем" },
    { t: "Источники данных", s: "откуда берём" },
    { t: "Протоколы решений", s: "что делаем" },
  ];
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[760px] overflow-hidden rounded-[20px] border border-pravda-line bg-pravda-soft/60 p-4">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {items.map((_, i) => {
          const angle = (-90 + i * 72) * (Math.PI / 180);
          const x = 50 + Math.cos(angle) * 36;
          const y = 50 + Math.sin(angle) * 36;
          return (
            <line key={i} x1={50} y1={50} x2={x} y2={y} stroke="currentColor" strokeWidth="0.3" className="text-pravda-line-strong" />
          );
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pravda-ink bg-pravda-bg px-5 py-4 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">в одном месте</div>
        <div className="text-[20px] font-extrabold tracking-[-0.03em] text-pravda-ink">Вся правда</div>
      </div>
      {items.map((n, i) => {
        const angle = (-90 + i * 72) * (Math.PI / 180);
        const x = 50 + Math.cos(angle) * 42;
        const y = 50 + Math.sin(angle) * 42;
        return (
          <div
            key={n.t}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-pravda-line-strong bg-pravda-bg px-3 py-1.5 text-center shadow-sm"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="text-[12px] font-bold tracking-[-0.01em] text-pravda-ink">{n.t}</div>
            <div className="text-[10px] text-pravda-muted">{n.s}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Sections ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-pravda-line bg-pravda-bg/90 backdrop-blur">
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" className="text-[22px] font-extrabold tracking-[-0.06em] text-pravda-ink">
          Правда<span className="text-pravda-red">.</span>
        </a>
        <div className="hidden gap-6 text-[13px] text-pravda-muted md:flex">
          <a href="#problem" className="hover:text-pravda-ink">Проблема</a>
          <a href="#approach" className="hover:text-pravda-ink">Подход</a>
          <a href="#program" className="hover:text-pravda-ink">Программа</a>
          <a href="#request" className="hover:text-pravda-ink">Заявка</a>
        </div>
        <a
          href="#request"
          className="inline-flex h-10 items-center rounded-full bg-pravda-ink px-4 text-[13px] font-semibold text-pravda-bg transition-transform hover:-translate-y-0.5"
        >
          Получить программу
        </a>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-pravda-line bg-pravda-bg">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24">
        <div>
          <h1 className="text-pravda-ink text-[clamp(56px,9vw,128px)] font-extrabold leading-[0.95] tracking-[-0.065em]">
            Правда<span className="text-pravda-red">.</span>
          </h1>
          <div className="mt-8 max-w-[560px]">
            <div className="grid grid-cols-[2fr_1fr] items-center gap-x-3 gap-y-1.5 text-[clamp(15px,1.5vw,18px)]">
              {[
                ["Отчёты ради отчётов", "Аналитика"],
                ["Метрики тщеславия", "Решения"],
                ["Бесконечная автоматизация", "Действия"],
              ].map(([from, to]) => (
                <div key={from} className="contents">
                  <span className="text-nowrap font-medium text-pravda-muted line-through decoration-pravda-red decoration-1">
                    {from}
                  </span>
                  <span className="font-semibold tracking-[-0.01em] text-pravda-ink">{to}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 max-w-[540px] text-[16px] leading-[1.55] text-pravda-text">
            Мастер-класс для адекватных руководителей и аналитиков, которые
            готовы смотреть правде в глаза.
          </p>
          <div className="mt-7">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center rounded-full bg-pravda-ink px-6 text-[14px] font-semibold text-pravda-bg"
            >
              Регистрация
            </a>
          </div>
        </div>
        <DashboardWithAgent />
      </Container>
    </section>
  );
}

function Audience() {
  const items = [
    { t: "Директора и владельцы", s: "Хотите наладить регулярный менеджмент и управлять по KPI, а не по ощущениям." },
    { t: "Руководители в корпорациях", s: "Ведёте проекты изменений и хотите донести цифры до топ-менеджмента." },
    { t: "Аналитики и специалисты", s: "Видите проблемы в данных, но вас не слышат и не понимают." },
  ];
  return (
    <section className="bg-pravda-soft/50 pt-16 pb-10">
      <Container>
        <SectionHead
          title="Для тех, кто хочет изменить ситуацию"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="rounded-[18px] border border-pravda-line bg-pravda-bg p-6">
              <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">{i.t}</div>
              <p className="mt-3 text-[15px] leading-[1.5] text-pravda-text">{i.s}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem" className="border-b border-pravda-line py-16">
      <Container>
        <SectionHead
          title="Устали разбираться с отчётами?"
          lead={
            <>
              Вы уже пробовали внедрить CRM, Power BI и даже ИИ-агентов.
              <br />
              <span className="font-semibold text-pravda-red">
                Но всё остаётся по-прежнему.
              </span>
            </>
          }
        />
        <div className="mx-auto max-w-[720px] md:max-w-none">
          <BrokenChainSchema />
        </div>
      </Container>
    </section>
  );
}

function Approach() {
  const metrics = [
    { t: "Результатные", s: "Прибыль, выручка, маржа, выполнение плана, NPS." },
    { t: "Стоимостные", s: "Себестоимость, CAC, cost per order, стоимость ошибки." },
    { t: "Диагностические", s: "Этап, сегмент, канал, отдел, причина отклонения." },
    { t: "Метрики действия", s: "Кто и что должен сделать при отклонении." },
  ];
  const mapSteps = [
    "Выбираем ключевые показатели и делим их на группы.",
    "Выстраиваем нужную структуру и разбираемся, чего не хватает.",
    "В итоге на воркшопе по конкретному бизнес-процессу собираем карту из 15–20 метрик.",
    "Разбираемся, как масштабировать этот подход на всю компанию.",
  ];
  return (
    <section id="approach" className="border-b border-pravda-line bg-pravda-bg py-16">
      <Container>
        <SectionHead title="Как проходит тренинг" />

        <div className="mb-2">
          <span className="inline-block rounded-full border border-pravda-line bg-pravda-soft/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-pravda-muted">
            10:00 – 12:00
          </span>
        </div>
        <div className="rounded-[20px] border border-pravda-line bg-pravda-bg p-5 md:p-6">
          <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">Аудит метрик</div>
          <p className="mt-2 max-w-[720px] text-[15px] leading-[1.55] text-pravda-text">
            Знакомимся с типологией метрик. Они бывают 4 типов:
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Результатные", s: "Прибыль, выручка, маржа, выполнение плана, NPS." },
              { t: "Стоимостные", s: "Себестоимость, CAC, cost per order, стоимость ошибки." },
              { t: "Диагностические", s: "Этап, сегмент, канал, отдел, причина отклонения." },
              { t: "Метрики действия", s: "Кто и что должен сделать при отклонении." },
            ].map((i) => (
              <div key={i.t} className="rounded-[16px] border border-pravda-line bg-pravda-bg p-5">
                <div className="text-[18px] font-bold tracking-[-0.02em] text-pravda-ink">{i.t}</div>
                <p className="mt-2 text-[14px] leading-[1.5] text-pravda-text">{i.s}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-pravda-line pt-4">
            <div className="text-[16px] font-bold tracking-[-0.02em] text-pravda-ink">
              Убираем метрики тщеславия
            </div>
            <p className="mt-1 text-[14px] leading-[1.5] text-pravda-text">
              Показатели, которые выглядят красиво, но на самом деле не помогают принимать решения.
            </p>
          </div>
        </div>

        <div className="mt-8 mb-2">
          <span className="inline-block rounded-full border border-pravda-line bg-pravda-soft/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-pravda-muted">
            12:00 – 14:00
          </span>
        </div>
        <div className="rounded-[20px] border border-pravda-line bg-pravda-bg p-5 md:p-6">
          <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">Построение карт метрик</div>
          <ol className="mt-4 space-y-3">
            {mapSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.55] text-pravda-text">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pravda-ink font-mono text-[11px] font-bold text-pravda-bg">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 overflow-hidden rounded-[14px] border border-pravda-line bg-pravda-bg">
            <img
              src={metricMapImg}
              alt="Карта метрик: финансовый результат, физлица, страховые"
              className="block w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FourTypes() {
  const items = [
    { t: "Результатные", s: "Прибыль, выручка, маржа, выполнение плана, NPS." },
    { t: "Стоимостные", s: "Себестоимость, CAC, cost per order, стоимость ошибки." },
    { t: "Диагностические", s: "Этап, сегмент, канал, отдел, причина отклонения." },
    { t: "Метрики действия", s: "Кто и что должен сделать при отклонении." },
  ];
  return (
    <section className="border-b border-pravda-line py-16">
      <Container>
        <SectionHead
          title="Четыре типа метрик"
          lead="Центральная рамка тренинга. Без неё показатели — это список, а не система."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i, idx) => (
            <div key={i.t} className="rounded-[16px] border border-pravda-line bg-pravda-bg p-5">
              <div className="font-mono text-[11px] text-pravda-muted">тип {idx + 1}</div>
              <div className="mt-2 text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">{i.t}</div>
              <p className="mt-2 text-[14px] leading-[1.5] text-pravda-text">{i.s}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-4 rounded-[18px] border-2 border-pravda-ink bg-pravda-bg p-6 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="text-[26px] font-extrabold tracking-[-0.03em] text-pravda-ink">
            Метрики тщеславия — вычёркиваем
          </div>
          <p className="text-[16px] leading-[1.5] text-pravda-text">
            Если показатель не связан с результатом, не имеет владельца и не
            запускает действия — он не должен занимать место в управленческом
            контуре. Интересный — да. Главный — нет.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Inventory() {
  const types = [
    { t: "Результат", tone: "ink" },
    { t: "Затраты", tone: "muted" },
    { t: "Диагностика", tone: "muted" },
    { t: "Действия", tone: "ink" },
  ];
  return (
    <div className="mb-10">
      <div className="mb-6">
        <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">Инвентаризация ваших показателей</div>
        <p className="mt-2 text-[15px] leading-[1.5] text-pravda-text">
          Знакомимся с типологией метрик. Они бывают 4 типов:
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {types.map((type) => (
          <div
            key={type.t}
            className={cn(
              "flex items-center justify-center rounded-[16px] border px-4 py-5 text-center",
              type.tone === "ink"
                ? "border-pravda-ink bg-pravda-ink text-pravda-bg"
                : "border-pravda-line bg-pravda-bg text-pravda-ink",
            )}
          >
            <div className="text-[16px] font-bold tracking-[-0.01em] md:text-[18px]">{type.t}</div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="text-[16px] font-bold tracking-[-0.02em] text-pravda-ink">
          Убираем метрики тщеславия
        </div>
        <p className="mt-1 text-[14px] leading-[1.5] text-pravda-text">
          Показатели, которые выглядят красиво, но на самом деле не помогают принимать решения.
        </p>
      </div>
    </div>
  );
}

function Program() {
  const mods = [
    { t: "Аудит отчётов", s: "Проходим по текущим отчётам, вытаскиваем показатели, ищем дубли и неиспользуемое." },
    { t: "Четыре типа метрик", s: "Раскладываем показатели и распознаём метрики тщеславия." },
    { t: "Очистка данных с ИИ", s: "Структура, аномалии, план-факт, группировки, текстовый мусор." },
    { t: "Карта метрик", s: "Что результат, что драйвер, где узкие места, какие метрики запускают действие." },
    { t: "Реестр метрик", s: "Паспорт: формула, источник, владелец, частота, пороги, правила реакции." },
    { t: "Дашборды от карты", s: "Логика дашборда от карты метрик, а не от красивых графиков." },
  ];
  return (
    <section id="program" className="border-b border-pravda-line bg-pravda-soft/50 py-16">
      <Container>
        <SectionHead
          title="Шесть модулей. Без мотивационной воды."
          lead="Не разговор «зачем нужен AI». Конкретный разбор: метрики, карты, дашборды и артефакты системы отчётности."
        />
        <Inventory />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {mods.map((m, i) => (
            <div key={m.t} className="rounded-[18px] border border-pravda-line bg-pravda-bg p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] text-pravda-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="h-px flex-1 bg-pravda-line ml-3" />
              </div>
              <div className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">{m.t}</div>
              <p className="mt-2 text-[14px] leading-[1.5] text-pravda-text">{m.s}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function System() {
  const items = [
    { t: "Метрики бизнеса и KPI", s: "что и зачем измеряем" },
    { t: "Очистка и качество", s: "что чиним до визуализации" },
    { t: "Справочники", s: "единые названия и маппинг" },
    { t: "Реестр метрик", s: "формулы и владельцы" },
    { t: "Карта метрик", s: "причинно-следственная схема" },
    { t: "Дашборд", s: "состояние системы" },
    { t: "Сценарный анализ", s: "what-if и гипотезы" },
    { t: "Инсайты и сториборд", s: "выводы и логика" },
    { t: "Протоколы решений", s: "действия и сроки" },
  ];
  return (
    <section className="border-b border-pravda-line py-16">
      <Container>
        <SectionHead
          title="Из чего состоит современная отчётность"
          lead="Дашборд — лишь один артефакт. Вокруг должна быть система, иначе отчёт превращается в картинку."
        />
        <div className="grid gap-2 md:grid-cols-3">
          {items.map((a, i) => (
            <div key={a.t} className="rounded-[14px] border border-pravda-line bg-pravda-bg p-4">
              <div className="font-mono text-[10px] text-pravda-muted">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-[16px] font-bold tracking-[-0.01em] text-pravda-ink">{a.t}</div>
              <div className="text-[13px] text-pravda-muted">{a.s}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Flow() {
  const steps = [
    { t: "Аудит отчётов и карта метрик", s: "Анализ отчётов, интервью с владельцами, связи и узкие места." },
    { t: "Проектирование данных", s: "Таблицы сбора, правила качества, витрины для аналитики." },
    { t: "Реестр и дашборды", s: "Паспорта метрик и дашборды от карты, а не от графиков." },
    { t: "Передача команде и ИИ-агенту", s: "Регламент, протоколы решений, обучение агента на ваших данных." },
  ];
  return (
    <section className="border-b border-pravda-line bg-pravda-soft/50 py-16">
      <Container>
        <SectionHead title="Как собираем систему" lead="Та же логика, что в реальном проекте: от аудита отчётов до передачи команде." />
        <div className="grid gap-3">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="grid items-center gap-4 rounded-[16px] border border-pravda-line bg-pravda-bg p-5 md:grid-cols-[60px_1fr_auto]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-pravda-ink font-mono text-[16px] font-bold text-pravda-bg">
                {i + 1}
              </div>
              <div>
                <div className="text-[18px] font-bold tracking-[-0.02em] text-pravda-ink">{s.t}</div>
                <div className="mt-1 text-[14px] leading-[1.5] text-pravda-text">{s.s}</div>
              </div>
              <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-pravda-muted md:block">
                шаг {String(i + 1).padStart(2, "0")} / 04
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TruthHub() {
  return (
    <section className="border-b border-pravda-line py-16">
      <Container>
        <SectionHead title="Вся правда — в одном месте" lead="После воркшопа у вас остаётся не презентация, а рабочий контур: метрики, формулы, отчёты, источники и решения связаны между собой." />
        <TruthHubSchema />
      </Container>
    </section>
  );
}

function Outcomes() {
  const tools = ["Power BI", "DataLens", "Excel", "Google Sheets", "Tableau", "Superset"];
  return (
    <section className="border-b border-pravda-line bg-pravda-soft/50 py-16">
      <Container>
        <SectionHead title="Что вы сможете делать после тренинга" />
        <div className="flex flex-col gap-5">
          {/* Panel 1 — dashboards */}
          <div className="flex flex-col gap-5 rounded-[20px] border border-pravda-line bg-pravda-bg p-5 md:flex-row md:items-center">
            <div className="flex flex-col gap-4 md:w-1/2">
              <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">Создавать actionable-дашборды</div>
              <p className="text-[14px] leading-[1.5] text-pravda-text">
                Логика от карты метрик: один уровень — одно решение. KPI-строка, динамика, структура и реестр на одном экране. Можно делать в любом инструменте.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span key={t} className="rounded-md border border-pravda-line bg-pravda-soft/60 px-2 py-1 text-[11px] text-pravda-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="overflow-hidden rounded-[14px] border border-pravda-line">
                <img
                  src={dashboardImg.url}
                  alt="Actionable-дашборд: маржа, структура, премия"
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Panel 2 — agents */}
          <div className="rounded-[20px] border border-pravda-line bg-pravda-bg p-5">
            <div className="text-[20px] font-bold tracking-[-0.02em] text-pravda-ink">Обучать ИИ-агентов</div>
            <div className="mt-3 grid gap-3 text-[14px] leading-[1.5] text-pravda-text md:grid-cols-2">
              <p>
                Вы закладываете базу систематизации: структуру метрик, связи и правила. На этой основе сохраняется история — агенты каждый день отслеживают изменения и подмечают то, на что замыливается глаз.
              </p>
              <p>
                Результат придёт не сразу, но через полгода такой работы агенты действительно начнут давать ценные инсайты и прогнозы.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Request() {
  const [open, setOpen] = useState(false);
  return (
    <section id="request" className="bg-pravda-bg py-20">
      <Container>
        <div className="grid gap-10 rounded-[28px] border-2 border-pravda-ink bg-pravda-bg p-8 md:grid-cols-[1fr_1fr] md:items-center md:p-12">
          <div>
            <h2 className="text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.045em] text-pravda-ink">
              Получить программу и условия
            </h2>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.5] text-pravda-text">
              Пришлём программу воркшопа, форматы (онлайн / корпоратив), цены и
              ближайшие даты. Без рассылок и звонков «просто узнать».
            </p>
            <div className="mt-6 grid gap-2 text-[13px] text-pravda-muted">
              <div>2 дня · 12 часов практики</div>
              <div>До 12 участников в группе</div>
              <div>Разбор на ваших данных</div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-pravda-ink px-7 text-[14px] font-semibold text-pravda-bg transition-transform hover:-translate-y-0.5"
            >
              Запросить программу
            </button>
            <p className="text-[12px] text-pravda-muted">
              Откроется форма — пришлём программу на e-mail.
            </p>
          </div>
        </div>
      </Container>
      <WidgetModal
        open={open}
        onOpenChange={setOpen}
        title="Запрос программы"
        scriptId="53c56496ada947cb2bbc32e41b4bf2231b7e145e"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1624157"
      />
    </section>
  );
}

function MetricMapFullscreen() {
  return (
    <section id="metric-map" className="border-b border-pravda-line bg-pravda-soft/50 pb-16 md:pb-20">
      <Container>
        <div className="overflow-hidden rounded-[18px] border border-pravda-line bg-pravda-bg">
          <img
            src={metricMapImg}
            alt="Карта метрик: финансовый результат, физлица, страховые"
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>
      </Container>
    </section>
  );
}

function TrainerSection() {
  const books = [
    "Дашборд для директора",
    "Заставьте данные говорить",
    "Азбука визуализации Power BI",
    "Синергия интеллектов",
  ];
  return (
    <section className="border-b border-pravda-line bg-pravda-bg py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          <div className="shrink-0">
            <div className="overflow-hidden rounded-[18px] border border-pravda-line">
              <img
                src={trainerImg.url}
                alt="Алексей Колоколов"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-extrabold tracking-[-0.03em] text-pravda-ink">
              Алексей Колоколов
            </div>
            <div className="mt-1 text-[15px] text-pravda-muted">
              Директор Института Бизнес-Аналитики
            </div>

            <div className="mt-6 rounded-[16px] border-l-2 border-pravda-ink bg-pravda-soft/40 p-5">
              <p className="text-[15px] leading-[1.6] text-pravda-text">
                16 лет я занимаюсь аналитикой данных. Моя компания делает отчёты для Северсталь, Сибур, РЖД, Siemens и других корпораций.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-pravda-text">
                Я знаю, что работает, и <span className="font-semibold text-pravda-ink">НЕ</span> работает в реальном бизнесе. И покажу вам правду.
              </p>
            </div>

            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pravda-muted">
                Автор книг
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {books.map((b) => (
                  <div
                    key={b}
                    className="rounded-[10px] border border-pravda-line bg-pravda-bg px-3 py-2 text-[13px] font-medium text-pravda-ink"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-pravda-line bg-pravda-bg py-10">
      <Container className="space-y-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
          <a
            href="https://neyro.mba/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pravda-muted hover:text-pravda-ink transition-colors"
          >
            Политика конфиденциальности
          </a>
          <a
            href="https://neyro.mba/osnovnie_svedeniya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pravda-muted hover:text-pravda-ink transition-colors"
          >
            Сведения об организации
          </a>
          <a
            href="https://neyro.mba/oferta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pravda-muted hover:text-pravda-ink transition-colors"
          >
            Публичная оферта
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-pravda-muted">
          <div>
            © 2026{" "}
            <a href="https://neyro.mba/study" target="_blank" rel="noopener noreferrer" className="hover:text-pravda-ink transition-colors">НейроМВА</a>
            {" · "}
            <a href="https://alexkolokolov.com" target="_blank" rel="noopener noreferrer" className="hover:text-pravda-ink transition-colors">Институт Бизнес-Аналитики</a>
          </div>
          <a href="#top" className="hover:text-pravda-ink transition-colors">↑ Наверх</a>
        </div>
      </Container>
    </footer>
  );
}

/* ---------- Widget modal (GetCourse) ---------- */

function WidgetModal({
  open,
  onOpenChange,
  title,
  scriptId,
  scriptSrc,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  scriptId: string;
  scriptSrc: string;
}) {
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>html,body{margin:0;padding:0;background:transparent;font-family:Inter,system-ui,-apple-system,sans-serif;color:#111}</style></head><body><script id="${scriptId}" src="${scriptSrc}"><\/script></body></html>`;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0 sm:rounded-[18px] overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative h-[640px] w-full bg-white">
          {/* spinner sits behind the iframe; the loaded widget overlays it */}
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 text-pravda-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-pravda-line border-t-pravda-ink" />
            <div className="text-[13px]">Форма загружается…</div>
          </div>
          <iframe
            key={scriptId + String(open)}
            title={title}
            srcDoc={srcDoc}
            className="relative z-10 h-full w-full border-0 bg-transparent"
            allow="payment *; clipboard-write *"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Pricing ---------- */

function Pricing() {
  const [openStd, setOpenStd] = useState(false);
  const [openBiz, setOpenBiz] = useState(false);

  const stdFeatures = [
    "Очное участие в воркшопе, 30 июля, Москва",
    "Все материалы и шаблоны",
    "Помощь преподавателей при выполнении заданий",
  ];
  const bizFeatures = [
    "Всё, что входит в «Стандарт»",
    "Персональная консультация с экспертом",
    "Разбор индивидуального запроса по вашим данным",
  ];

  return (
    <section id="pricing" className="border-b border-pravda-line bg-pravda-soft/40 py-20">
      <Container>
        <SectionHead title="Тарифы" />
        <div className="grid gap-5 md:grid-cols-2">
          <PricingCard
            name="Стандарт"
            price="5 000 ₽"
            note="Участие в воркшопе"
            features={stdFeatures}
            ctaLabel="Купить «Стандарт»"
            onClick={() => setOpenStd(true)}
            variant="default"
          />
          <PricingCard
            name="Бизнес"
            price="15 000 ₽"
            note="Воркшоп + персональная консультация"
            features={bizFeatures}
            ctaLabel="Купить «Бизнес»"
            onClick={() => setOpenBiz(true)}
            variant="accent"
          />
        </div>
      </Container>
      <WidgetModal
        open={openStd}
        onOpenChange={setOpenStd}
        title="Тариф «Стандарт»"
        scriptId="d3463e220da9a7dca915362c2e87c214fcad7309"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1624152"
      />
      <WidgetModal
        open={openBiz}
        onOpenChange={setOpenBiz}
        title="Тариф «Бизнес»"
        scriptId="7360192070ad4ca2c37cac13cd33cd323156513e"
        scriptSrc="https://insba.getcourse.ru/pl/lite/widget/script?id=1624154"
      />
    </section>
  );
}

function PricingCard({
  name,
  price,
  note,
  features,
  ctaLabel,
  onClick,
  variant,
}: {
  name: string;
  price: string;
  note: string;
  features: string[];
  ctaLabel: string;
  onClick: () => void;
  variant: "default" | "accent";
}) {
  const isAccent = variant === "accent";
  return (
    <div
      className={cn(
        "flex flex-col rounded-[20px] border bg-pravda-bg p-8",
        isAccent ? "border-pravda-ink border-2" : "border-pravda-line",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[22px] font-extrabold tracking-[-0.03em] text-pravda-ink">
          {name}
        </div>
        {isAccent && (
          <span className="rounded-full bg-pravda-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-pravda-bg">
            Рекомендуем
          </span>
        )}
      </div>
      <div className="mt-4 text-[44px] font-extrabold leading-none tracking-[-0.04em] text-pravda-ink">
        {price}
      </div>
      <div className="mt-2 text-[13px] text-pravda-muted">{note}</div>

      <ul className="mt-6 grid gap-3 border-t border-pravda-line pt-5 text-[14px] leading-[1.45] text-pravda-text">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span
              className={cn(
                "mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                isAccent ? "bg-pravda-red" : "bg-pravda-ink",
              )}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onClick}
        className={cn(
          "mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-[14px] font-semibold transition-transform hover:-translate-y-0.5",
          isAccent
            ? "bg-pravda-ink text-pravda-bg"
            : "border border-pravda-ink bg-pravda-bg text-pravda-ink",
        )}
      >
        {ctaLabel}
      </button>
    </div>
  );
}


export function PravdaLanding() {
  return (
    <div
      id="top"
      className="min-h-screen bg-pravda-bg text-pravda-ink"
      style={{ fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <Header />
      <main>
        <Hero />
        <Problem />
        <Audience />
        
        <Approach />
        
        <Outcomes />
        <TrainerSection />
        <Pricing />
        <Request />
      </main>
      <Footer />
    </div>
  );
}

export default PravdaLanding;