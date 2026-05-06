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
  Sales: "Продажи",
  Finance: "Финансы",
  Marketing: "Маркетинг",
  HR: "HR",
  Health: "Здоровье",
  SaaS: "SaaS",
  Logistics: "Логистика",
  RealEstate: "Недвижимость",
  Support: "Поддержка",
};

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
    <section id="gallery" className="relative px-6 md:px-10 py-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="v5-display text-5xl md:text-7xl leading-[0.95]">
            Все <span className="italic v5-blue">работы</span>
          </h2>
          <div className="text-sm v5-dim">
            показано · <span className="v5-green font-semibold">{items.length}</span> из {dashboards.length}
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
            <div key={rIdx} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
                      <div className={`v5-frame v5-pal-${d.palette ?? "dark"}`}>
                        <img src={d.image} alt={d.title} loading="lazy" />
                        <div
                          className="absolute top-7 right-7 v5-chip"
                          style={{ background: "hsl(var(--v5-bg) / 0.75)", zIndex: 4 }}
                        >
                          {CATEGORY_LABEL[d.category]}
                        </div>
                      </div>
                      <div className="v5-gallery-card-body">
                        <h3 className="v5-display text-2xl md:text-3xl leading-[0.95] mb-3">
                          {d.title}
                        </h3>
                        <div className="text-xs v5-dim mb-3">{d.author}</div>
                        <p className="text-sm leading-relaxed v5-dim">
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
