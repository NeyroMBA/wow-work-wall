import { useMemo, useState } from "react";
import { dashboards, type Dashboard, type Category } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

const CATEGORIES: { key: Category | "All"; label: string }[] = [
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

const CATEGORY_LABEL: Record<Category, string> = {
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

const TOOL_KEYWORDS = ["claude", "lovable", "chat gpt", "chatgpt", "gpt", "figma", "tableau", "power bi"];
const isTool = (f: string) => TOOL_KEYWORDS.some((t) => f.toLowerCase().includes(t));

// chaotic offsets per column position (3 per row)
const offsets = [
  { mt: 0, rot: -1.5 },
  { mt: 56, rot: 1.2 },
  { mt: 24, rot: -0.8 },
];

const V5Gallery = ({ onSelect }: Props) => {
  const [filter, setFilter] = useState<Category | "All">("All");

  const items = useMemo(
    () =>
      filter === "All"
        ? dashboards
        : dashboards.filter((d) => d.categories.includes(filter)),
    [filter]
  );

  const rows: Dashboard[][] = useMemo(() => {
    const out: Dashboard[][] = [];
    for (let i = 0; i < items.length; i += 3) out.push(items.slice(i, i + 3));
    return out;
  }, [items]);

  return (
    <section id="gallery" className="relative px-6 md:px-10 py-32">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="v5-display text-5xl md:text-7xl leading-[0.95]">
            Все <span className="italic v5-blue">работы</span>
          </h2>
          <div className="text-sm v5-dim">
            показано · <span className="v5-green font-semibold">{items.length}</span> из {dashboards.length}
          </div>
        </div>

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

        {rows.length === 0 && (
          <div className="text-center py-32 v5-dim">пусто — попробуйте другой фильтр</div>
        )}
        <div className="space-y-20">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {row.map((d, cIdx) => {
                const o = offsets[cIdx];
                const catLabels = d.categories.map((c) => CATEGORY_LABEL[c]).join(" · ");
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
                    >
                      <div
                        className={`v5-frame v5-pal-${d.palette ?? "dark"}`}
                        onClick={() => onSelect(d)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={d.image} alt={d.title} loading="lazy" />
                        <div
                          className="absolute top-7 right-7 v5-chip"
                          style={{ background: "hsl(var(--v5-bg) / 0.75)", zIndex: 4 }}
                        >
                          {catLabels}
                        </div>
                      </div>
                      <div className="v5-gallery-card-body">
                        {d.features.length > 0 && (
                          <div className="v5-features">
                            {d.features.map((f) => (
                              <span
                                key={f}
                                className={`v5-feature ${isTool(f) ? "v5-feature-tool" : ""}`}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="v5-display text-2xl md:text-3xl leading-[0.95] mb-2">
                          {d.title}
                        </h3>
                        <div className="text-xs v5-dim mb-3">{d.author}</div>
                        <p className="text-sm leading-relaxed v5-dim">
                          {d.description}
                        </p>
                        {d.link && (
                          <a
                            className="v5-card-link"
                            href={d.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Открыть дашборд →
                          </a>
                        )}
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
