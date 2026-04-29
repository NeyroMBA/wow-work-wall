import { useRef, useState, type CSSProperties } from "react";
import type { Dashboard } from "@/data/dashboards";

type Props = {
  dashboard: Dashboard;
  style?: CSSProperties;
  layer: number;
  onClick: () => void;
};

const DashboardCard = ({ dashboard, style, layer, onClick }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 12, ry: x * 12 });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0 }); }}
      style={style}
      className="group block text-left transition-all duration-500"
    >
      <div
        className="relative rounded-2xl overflow-hidden glass shadow-card-deep transition-all duration-500"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${hovered ? 'translateY(-12px) scale(1.04)' : ''}`,
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 40px 100px -20px hsl(230 60% 2% / 0.9), 0 0 60px hsl(var(--primary) / 0.4)`
            : undefined,
        }}
      >
        {/* Gradient border on hover */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${dashboard.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
          style={{ filter: 'blur(20px)' }}
        />

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={dashboard.image}
            alt={dashboard.title}
            loading="lazy"
            width={1024}
            height={768}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
          
          {/* Category pill */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium">
            {dashboard.category}
          </div>

          {/* Cohort */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent-magenta) / 0.3))` }}>
            {dashboard.cohort}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-2">
          <h3 className="font-display text-xl font-medium leading-tight">{dashboard.title}</h3>
          <p className="text-sm text-muted-foreground">by {dashboard.author}</p>
          {layer === 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {dashboard.tools.map(t => (
                <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Reveal arrow */}
        <div className={`absolute bottom-5 right-5 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-500 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </div>
      </div>
    </button>
  );
};

export default DashboardCard;
