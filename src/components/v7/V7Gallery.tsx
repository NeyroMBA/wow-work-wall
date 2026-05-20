import { useMemo, useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

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

type Mode = "chaotic" | "grid";

// Bento mosaic — landscape cards of varying column spans (out of 6)
// Pattern repeats every 5 cards: wide+narrow / narrow+wide / full-ish split
const CHAOS_SPANS = [4, 2, 3, 3, 2, 4, 3, 3, 4, 2, 2, 4];
const CHAOS_ASPECTS_BY_SPAN: Record<number, string> = {
  2: "4 / 3",
  3: "16 / 10",
  4: "21 / 10",
};

const V7Gallery = ({ onSelect }: Props) => {
  const [filter, setFilter] = useState<Dashboard["category"] | "All">("All");
  const [mode, setMode] = useState<Mode>("chaotic");

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

        <div className="flex flex-wrap items-center gap-2 mb-12">
          <div className="flex flex-wrap gap-2 flex-1">
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
          <div className="v7-mode-toggle" role="tablist" aria-label="Вид галереи">
            <button
              role="tab"
              aria-selected={mode === "chaotic"}
              onClick={() => setMode("chaotic")}
              className={`v7-mode-btn ${mode === "chaotic" ? "is-active" : ""}`}
              title="Хаотичная мозаика"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="1" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="8" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="1" y="12" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <span>Мозаика</span>
            </button>
            <button
              role="tab"
              aria-selected={mode === "grid"}
              onClick={() => setMode("grid")}
              className={`v7-mode-btn ${mode === "grid" ? "is-active" : ""}`}
              title="Ровная сетка"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <span>Сетка</span>
            </button>
          </div>
        </div>

        {items.length === 0 && (
          <div className="text-center py-32 v5-dim">пусто — попробуйте другой фильтр</div>
        )}

        <div className={mode === "chaotic" ? "v7-masonry" : "v7-grid"}>
          {items.map((d, idx) => {
            const accent = CATEGORY_ACCENT[d.category];
            const aspect = mode === "chaotic" ? CHAOS_ASPECTS[idx % CHAOS_ASPECTS.length] : "16 / 10";
            return (
              <article
                key={d.id}
                className={`v7-card v7-acc-${accent}`}
                onClick={() => onSelect(d)}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="v7-card-image" style={{ aspectRatio: aspect }}>
                  <img src={d.image} alt={d.title} loading="lazy" />
                  <span className="v7-chip v7-chip-float">{CATEGORY_LABEL[d.category]}</span>
                  <span className="v7-arrow" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <footer className="v7-foot">
                  <h3 className="v7-title">{d.title}</h3>
                  <div className="v7-author">{d.author}</div>
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
