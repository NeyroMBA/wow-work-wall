import { useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

const categories = ["Все", "Sales", "Finance", "Health", "SaaS", "Marketing", "Logistics", "HR", "RealEstate", "Support"];

const V4Index = ({ onSelect }: Props) => {
  const [filter, setFilter] = useState<string>("Все");
  const list = filter === "Все" ? dashboards : dashboards.filter((d) => d.category === filter);

  return (
    <section id="index" className="relative px-8 py-32 v4-grain">
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-2 v4-mono text-[11px] uppercase tracking-[0.2em] v4-dim">№ 002</div>
        <h2 className="col-span-12 md:col-span-10 v4-serif text-[8vw] md:text-[6vw]">
          Каталог <span className="italic v4-mint">по индексу</span>
        </h2>
      </div>

      <div className="v4-rule mb-8" />

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="v4-chip transition-colors"
            style={
              filter === c
                ? { borderColor: "hsl(152 76% 58%)", color: "hsl(152 76% 58%)" }
                : undefined
            }
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="divide-y" style={{ borderColor: "hsl(230 25% 22%)" }}>
        {list.map((d, idx) => (
          <li
            key={d.id}
            className="grid grid-cols-12 gap-6 items-center py-6 group cursor-pointer transition-colors"
            style={{ borderTop: idx === 0 ? "1px solid hsl(230 25% 22%)" : undefined }}
            onClick={() => onSelect(d)}
          >
            <div className="col-span-1 v4-mono text-xs v4-dim">
              {String(idx + 1).padStart(3, "0")}
            </div>
            <div className="col-span-5 md:col-span-4 v4-serif text-2xl md:text-3xl group-hover:italic transition-all">
              {d.title}
            </div>
            <div className="col-span-3 md:col-span-2 v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim">
              {d.author}
            </div>
            <div className="hidden md:block col-span-2 v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim">
              {d.category}
            </div>
            <div className="hidden md:block col-span-2 v4-mono text-[11px] uppercase tracking-[0.18em] v4-dim">
              {d.tools.join(" · ")}
            </div>
            <div className="col-span-3 md:col-span-1 text-right v4-mono text-[11px] uppercase tracking-[0.18em] v4-mint">
              открыть →
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default V4Index;
