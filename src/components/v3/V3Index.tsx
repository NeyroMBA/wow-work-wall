import { dashboards, type Dashboard } from "@/data/dashboards";

const V3Index = ({ onSelect }: { onSelect: (d: Dashboard) => void }) => (
  <section className="relative z-10 px-8 py-16 max-w-[1400px] mx-auto">
    <div className="grid grid-cols-12 gap-8 mb-10">
      <div className="col-span-12 md:col-span-2 v3-mono text-xs uppercase tracking-[0.25em] v3-muted">
        Index<br/>p. 042
      </div>
      <h2 className="col-span-12 md:col-span-10 v3-display text-5xl md:text-7xl font-light leading-none">
        All works, <em className="italic v3-accent">A–Z</em>.
      </h2>
    </div>

    <div className="v3-rule mb-2" />

    <div className="divide-y v3-border">
      {dashboards.map((d, i) => (
        <button
          key={d.id}
          onClick={() => onSelect(d)}
          className="group w-full grid grid-cols-12 gap-4 py-6 text-left items-baseline hover:v3-warm-bg transition-colors px-2"
        >
          <span className="col-span-1 v3-mono text-sm v3-muted v3-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="col-span-12 md:col-span-5 v3-display text-2xl md:text-3xl font-medium group-hover:italic group-hover:v3-accent transition-all">
            {d.title}
          </span>
          <span className="col-span-6 md:col-span-3 v3-mono text-xs uppercase tracking-widest v3-muted">
            {d.author}
          </span>
          <span className="col-span-4 md:col-span-2 v3-mono text-xs uppercase tracking-widest">
            {d.category}
          </span>
          <span className="col-span-2 md:col-span-1 v3-mono text-xs uppercase tracking-widest v3-muted text-right">
            {d.cohort.replace("Cohort ", "C·")}
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default V3Index;
