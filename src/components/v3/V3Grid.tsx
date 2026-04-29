import { useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

const categories = ["Все", ...Array.from(new Set(dashboards.map(d => d.category)))];

const V3Grid = ({ onSelect }: { onSelect: (d: Dashboard) => void }) => {
  const [filter, setFilter] = useState("Все");
  const visible = filter === "Все" ? dashboards : dashboards.filter(d => d.category === filter);

  return (
    <section id="all" className="relative px-8 py-24 max-w-[1500px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div className="v3-mono text-xs uppercase tracking-[0.3em] v3-accent mb-3">Все работы</div>
          <h2 className="v3-display text-5xl md:text-7xl font-medium leading-none">
            Полная <span className="v3-grad-text italic font-medium">галерея</span>.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-xs v3-mono uppercase tracking-widest transition-all ${
                filter === c ? "v3-bg-accent font-bold" : "v3-muted hover:text-white"
              }`}
              style={filter !== c ? { border: "1px solid hsl(222 30% 14%)" } : {}}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            className="v3-card-shell text-left group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={d.image} alt={d.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <div className="v3-mono text-[10px] uppercase tracking-widest v3-accent mb-2">
                {d.category} · {d.cohort}
              </div>
              <h3 className="v3-display text-xl font-medium leading-tight">{d.title}</h3>
              <p className="v3-muted text-sm mt-1">{d.author}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default V3Grid;
