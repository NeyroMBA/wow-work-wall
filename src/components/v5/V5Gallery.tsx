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

// chaotic offsets per column position (3 per row)
const offsets = [
  { mt: 0,   rot: -1.5 },
  { mt: 56,  rot:  1.2 },
  { mt: 24,  rot: -0.8 },
];

const V5Gallery = ({ onSelect }: Props) => {
  const [filter, setFilter] = useState<Dashboard["category"] | "All">("All");

  const items = useMemo(
    () => (filter === "All" ? dashboards : dashboards.filter((d) => d.category === filter)),
    [filter]
  );

  // group items into rows of 3
  const rows: Dashboard[][] = useMemo(() => {
    const out: Dashboard[][] = [];
    for (let i = 0; i < items.length; i += 3) out.push(items.slice(i, i + 3));
    return out;
  }, [items]);

  return (
    <section id="gallery" className="relative px-6 md:px-12 py-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="v5-mono text-[10px] uppercase tracking-[0.3em] v5-dim mb-3">
              № 002 — каталог
            </div>
            <h2 className="v5-serif text-5xl md:text-7xl leading-[0.95]">
              Все <span className="italic v5-violet">работы</span>
            </h2>
          </div>
          <div className="v5-mono text-[11px] uppercase tracking-[0.2em] v5-dim">
            показано · <span className="v5-mint">{items.length}</span> из {dashboards.length}
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-16">
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

        {/* Chaotic 3-per-row grid */}
        {rows.length === 0 && (
          <div className="text-center py-32 v5-dim">пусто — попробуйте другой фильтр</div>
        )}
        <div className="space-y-20">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {row.map((d, cIdx) => {
                const o = offsets[cIdx];
                return (
                  <div
                    key={d.id}
                    className="v5-fade"
                    style={{
                      marginTop: o.mt,
                      animationDelay: `${(rIdx * 3 + cIdx) * 60}ms`,
                    }}
                  >
                    <article
                      className="v5-gallery-card"
                      style={{ transform: `rotate(${o.rot}deg)` }}
                      onClick={() => onSelect(d)}
                    >
                      <div className="relative">
                        <img src={d.image} alt={d.title} loading="lazy" />
                        <div className="absolute top-4 left-4 v5-chip" style={{ background: "hsl(var(--v5-bg) / 0.7)" }}>
                          {d.category}
                        </div>
                      </div>
                      <div className="v5-gallery-card-body">
                        <div className="v5-mono text-[10px] uppercase tracking-[0.22em] v5-mint mb-3">
                          № {String(d.id).padStart(3, "0")} · {d.cohort}
                        </div>
                        <h3 className="v5-serif text-3xl md:text-4xl leading-[0.95] mb-3">
                          {d.title}
                        </h3>
                        <div className="v5-mono text-[11px] uppercase tracking-[0.18em] v5-dim mb-4">
                          {d.author}
                        </div>
                        <p className="text-sm leading-relaxed v5-dim line-clamp-3">
                          {d.description}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V5Gallery;
