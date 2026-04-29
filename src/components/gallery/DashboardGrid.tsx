import { useState } from "react";
import { dashboards } from "@/data/dashboards";
import DashboardCard from "./DashboardCard";
import DashboardModal from "./DashboardModal";
import type { Dashboard } from "@/data/dashboards";

const categories = ["Все", ...Array.from(new Set(dashboards.map(d => d.category)))];

const DashboardGrid = ({ external, onCloseExternal }: { external?: Dashboard | null; onCloseExternal?: () => void }) => {
  const [selected, setSelected] = useState<Dashboard | null>(null);
  const [filter, setFilter] = useState<string>("Все");

  const visible = filter === "Все" ? dashboards : dashboards.filter(d => d.category === filter);
  const open = external ?? selected;
  const close = () => {
    setSelected(null);
    onCloseExternal?.();
  };

  return (
    <section className="relative px-6 py-16">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 px-2">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">All works</div>
            <h2 className="font-display text-3xl md:text-5xl font-light">Полная галерея</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((d) => (
            <div key={d.id} className="animate-fade-in">
              <DashboardCard
                dashboard={d}
                layer={1}
                onClick={() => setSelected(d)}
              />
            </div>
          ))}
        </div>
      </div>

      {open && <DashboardModal dashboard={open} onClose={close} />}
    </section>
  );
};

export default DashboardGrid;
