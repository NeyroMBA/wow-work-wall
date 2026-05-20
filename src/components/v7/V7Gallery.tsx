import { useMemo, useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";
import V7Viz, { type VizKind } from "./V7Viz";

type Props = { onSelect: (d: Dashboard) => void };

const CATEGORIES: { key: Dashboard["category"] | "All"; label: string }[] = [
  { key: "All", label: "Все" },
  { key: "Sales", label: "Продажи" },
  { key: "Finance", label: "Финансы" },
  { key: "Marketing", label: "Маркетинг" },
  { key: "HR", label: "HR" },
  { key: "Health", label: "Здоровье" },
  { key: "SaaS", label: "SaaS" },
  { key: "Logistics", label: "Логистика" },
  { key: "RealEstate", label: "Недвижимость" },
  { key: "Support", label: "Поддержка" },
];

const CATEGORY_LABEL: Record<Dashboard["category"], string> = {
  Sales: "ПРОДАЖИ",
  Finance: "ФИНАНСЫ",
  Marketing: "МАРКЕТИНГ",
  HR: "HR / КАДРЫ",
  Health: "ЗДОРОВЬЕ",
  SaaS: "ПРОДУКТ",
  Logistics: "ОПЕРАЦИИ",
  RealEstate: "НЕДВИЖИМОСТЬ",
  Support: "ПОДДЕРЖКА",
};

type Accent = "green" | "blue" | "yellow" | "red" | "violet" | "orange";

const CATEGORY_ACCENT: Record<Dashboard["category"], Accent> = {
  Sales: "blue",
  Finance: "yellow",
  Marketing: "red",
  HR: "green",
  Health: "violet",
  SaaS: "blue",
  Logistics: "green",
  RealEstate: "orange",
  Support: "violet",
};

const VIZ_CYCLE: VizKind[] = ["line", "bars", "funnel", "candles", "heatmap", "scatter", "area"];

// Stable hash from id
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const fmt = (n: number, prefix = "") => {
  if (n >= 1000) return `${prefix}${(n / 1000).toFixed(1)}k`;
  return `${prefix}${n}`;
};

const metricsFor = (d: Dashboard) => {
  const h = hash(d.id);
  const rnd = (i: number, max: number) => ((h >> (i * 3)) % max);
  const prefixes = ["₽", "", "", "₽", ""];
  return ["A", "B", "C", "D"].map((label, i) => {
    const big = rnd(i, 9999) + 100;
    const isCurrency = i === 1 || i === 3;
    const delta = (rnd(i + 5, 50) - 20);
    return {
      label: `Метрика ${label}`,
      value: isCurrency ? fmt(big, "₽") : fmt(big),
      delta,
    };
  });
};

const V7Gallery = ({ onSelect }: Props) => {
  const [filter, setFilter] = useState<Dashboard["category"] | "All">("All");

  const items = useMemo(
    () => (filter === "All" ? dashboards : dashboards.filter((d) => d.category === filter)),
    [filter]
  );

  return (
    <section id="gallery" className="v7-gallery">
      <div className="v7-gallery-inner">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="v5-display text-5xl md:text-7xl leading-[0.95]">
            Все <span className="italic v5-blue">работы</span>
          </h2>
          <div className="text-sm v5-dim">
            показано · <span className="v5-green font-semibold">{items.length}</span> из {dashboards.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`v5-chip ${filter === c.key ? "v5-chip--active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-32 v5-dim">пусто — попробуйте другой фильтр</div>
        )}

        <div className="v7-grid">
          {items.map((d, idx) => {
            const accent = CATEGORY_ACCENT[d.category];
            const viz = VIZ_CYCLE[hash(d.id) % VIZ_CYCLE.length];
            const metrics = metricsFor(d);
            const pct = 30 + (hash(d.id) % 60);
            const circumference = 2 * Math.PI * 52;
            const offset = circumference * (1 - pct / 100);
            const headerDelta = ((hash(d.id) >> 4) % 50) - 20;
            return (
              <article
                key={d.id}
                className={`v7-card v7-acc-${accent}`}
                onClick={() => onSelect(d)}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <header className="v7-head">
                  <span className="v7-chip">
                    {CATEGORY_LABEL[d.category]}
                    <span
                      className="v7-chip-delta"
                      style={{
                        ["--delta-color" as never]:
                          headerDelta >= 0 ? "hsl(var(--v7-green))" : "hsl(var(--v7-red))",
                      }}
                    >
                      {headerDelta >= 0 ? "↑" : "↓"} {Math.abs(headerDelta)}%
                    </span>
                  </span>
                  <div className="v7-metrics">
                    {metrics.slice(1, 4).map((m) => (
                      <div key={m.label} className="v7-metric">
                        <div className="v7-metric-label">{m.label}</div>
                        <div className="v7-metric-value">{m.value}</div>
                        <div className={`v7-metric-delta ${m.delta >= 0 ? "v7-up" : "v7-down"}`}>
                          {m.delta >= 0 ? "↑" : "↓"} {Math.abs(m.delta)}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="v7-arrow" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </header>

                <div className="v7-body">
                  <div className="v7-viz">
                    <V7Viz kind={viz} seed={hash(d.id)} color={accent} />
                  </div>
                  <div className="v7-donut" aria-hidden>
                    <svg viewBox="0 0 120 120">
                      <circle className="v7-donut-track" cx="60" cy="60" r="52" fill="none" strokeWidth="10" />
                      <circle
                        className="v7-donut-fill"
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <div className="v7-donut-text">
                      <div className="pct">{pct}%</div>
                      <div className="lbl">PRIMARY</div>
                    </div>
                  </div>
                </div>

                <footer className="v7-foot">
                  <div className="v7-author">{d.author}</div>
                  <h3 className="v7-title">{d.title}</h3>
                  <div className="v7-stamp">обновлён 2 мин назад · автор · {d.author}</div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default V7Gallery;
