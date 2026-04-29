import { dashboards, type Dashboard } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

const V3Bento = ({ onSelect }: Props) => {
  const [feature, ...rest] = dashboards;
  const small = rest.slice(0, 2);
  const wide = rest[2];
  const grid = rest.slice(3, 7);
  const tall = rest[7];

  return (
    <section className="relative z-10 px-8 py-16 max-w-[1400px] mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="v3-mono text-xs uppercase tracking-[0.25em] v3-muted mb-3">Feature&nbsp;Stories</div>
          <h2 className="v3-display text-5xl md:text-6xl font-light leading-none">
            This <em className="italic v3-accent">issue</em>.
          </h2>
        </div>
        <div className="v3-mono text-xs uppercase tracking-widest v3-muted hidden md:block">
          08 selected works · click to read
        </div>
      </div>

      <div className="v3-rule mb-10" />

      {/* HERO FEATURE — full width */}
      <button
        onClick={() => onSelect(feature)}
        className="group block w-full text-left v3-zoom v3-rise mb-14"
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-hidden v3-paper-bg border v3-border aspect-[16/10]">
              <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="v3-mono text-xs uppercase tracking-widest v3-accent mb-3">
              № 01 · Cover Story
            </div>
            <h3 className="v3-display text-4xl md:text-5xl font-medium leading-[0.95] mb-4 group-hover:italic transition-all">
              {feature.title}
            </h3>
            <div className="v3-rule mb-4" />
            <p className="v3-mono text-xs uppercase tracking-widest v3-muted mb-4">
              By {feature.author} · {feature.cohort}
            </p>
            <p className="v3-display text-lg leading-snug font-light">
              {feature.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 v3-mono text-xs uppercase tracking-widest border-b border-current pb-1 group-hover:v3-accent transition-colors">
              Read the work →
            </div>
          </div>
        </div>
      </button>

      {/* TWO SMALL */}
      <div className="grid grid-cols-12 gap-8 mb-14">
        {small.map((d, i) => (
          <BentoCard key={d.id} d={d} num={i + 2} onSelect={onSelect} className="col-span-12 md:col-span-6" />
        ))}
      </div>

      {/* WIDE */}
      <div className="mb-14">
        <BentoCard d={wide} num={4} onSelect={onSelect} variant="wide" className="col-span-12" />
      </div>

      {/* 4-COL GRID + TALL */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-8">
          {grid.map((d, i) => (
            <BentoCard key={d.id} d={d} num={i + 5} onSelect={onSelect} compact />
          ))}
        </div>
        <div className="col-span-12 md:col-span-4">
          <BentoCard d={tall} num={9} onSelect={onSelect} variant="tall" />
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({
  d, num, onSelect, variant, compact, className = ""
}: {
  d: Dashboard;
  num: number;
  onSelect: (d: Dashboard) => void;
  variant?: "wide" | "tall";
  compact?: boolean;
  className?: string;
}) => {
  const aspect = variant === "wide" ? "aspect-[21/9]" : variant === "tall" ? "aspect-[3/4]" : compact ? "aspect-[4/3]" : "aspect-[4/5]";
  return (
    <button
      onClick={() => onSelect(d)}
      className={`group block text-left v3-zoom v3-rise ${className}`}
    >
      <div className={`relative overflow-hidden v3-paper-bg border v3-border ${aspect}`}>
        <img src={d.image} alt={d.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-4 left-4 v3-mono text-xs uppercase tracking-widest px-2 py-1 v3-paper-bg v3-ink">
          № {String(num).padStart(2, "0")}
        </div>
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`v3-display ${compact ? "text-xl" : "text-2xl md:text-3xl"} font-medium leading-tight group-hover:italic transition-all`}>
            {d.title}
          </h3>
          <p className="v3-mono text-[11px] uppercase tracking-widest v3-muted mt-2">
            {d.author} · {d.category} · {d.cohort}
          </p>
        </div>
        <span className="v3-mono text-xs v3-accent shrink-0 mt-1">↗</span>
      </div>
    </button>
  );
};

export default V3Bento;
