import { useEffect } from "react";
import type { Dashboard } from "@/data/dashboards";

const DashboardModal = ({ dashboard, onClose }: { dashboard: Dashboard; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />
      
      <div
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-3xl glass shadow-glow animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
          <img src={dashboard.image} alt={dashboard.title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${dashboard.accent} opacity-20 mix-blend-overlay`} />
        </div>

        <div className="p-8 md:p-12 -mt-32 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full glass text-xs">{dashboard.category}</span>
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent-magenta) / 0.3))` }}>{dashboard.cohort}</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-light mb-3">{dashboard.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">by <span className="text-foreground">{dashboard.author}</span></p>

          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mb-10 leading-relaxed">{dashboard.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Stack</div>
              <div className="font-display text-lg">{dashboard.tools.join(" · ")}</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Метрик</div>
              <div className="font-display text-2xl text-gradient">42</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Источников</div>
              <div className="font-display text-2xl text-gradient-electric">7</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Оценка</div>
              <div className="font-display text-2xl">9.4<span className="text-muted-foreground text-base">/10</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
