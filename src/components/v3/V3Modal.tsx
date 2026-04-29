import { useEffect } from "react";
import type { Dashboard } from "@/data/dashboards";

const V3Modal = ({ dashboard, onClose }: { dashboard: Dashboard; onClose: () => void }) => {
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
    <div className="fixed inset-0 z-50 v3-scope overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "hsl(222 47% 4% / 0.92)", backdropFilter: "blur(20px)" }} />
      <div
        className="relative max-w-6xl mx-auto my-8 md:my-16 v3-card-shell v3-glow"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "v3-pop 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full v3-bg-accent font-bold hover:scale-110 transition-transform"
        >
          ✕
        </button>

        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={dashboard.image} alt={dashboard.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(222 47% 4%) 0%, transparent 50%)" }} />
        </div>

        <div className="p-8 md:p-12 -mt-32 relative">
          <div className="flex flex-wrap items-center gap-3 mb-4 v3-mono text-[10px] uppercase tracking-widest">
            <span className="px-3 py-1 rounded-full v3-bg-accent font-bold">{dashboard.category}</span>
            <span className="px-3 py-1 rounded-full v3-muted" style={{ border: "1px solid hsl(222 30% 14%)" }}>{dashboard.cohort}</span>
          </div>
          <h2 className="v3-display text-5xl md:text-7xl font-medium leading-[0.95] mb-3">{dashboard.title}</h2>
          <p className="text-lg v3-muted mb-8">Автор: <span className="text-white">{dashboard.author}</span></p>

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mb-10">{dashboard.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "Стек", v: dashboard.tools.join(" · ") },
              { l: "Метрик", v: "42" },
              { l: "Источников", v: "7" },
              { l: "Оценка", v: "9.4 / 10" },
            ].map(s => (
              <div key={s.l} className="p-4 rounded-xl" style={{ border: "1px solid hsl(222 30% 14%)", background: "hsl(222 47% 4%)" }}>
                <div className="v3-mono text-[10px] uppercase tracking-widest v3-muted mb-2">{s.l}</div>
                <div className="v3-display text-xl font-medium">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes v3-pop { from {opacity:0; transform: translateY(40px) scale(0.96);} to {opacity:1; transform: translateY(0) scale(1);} }`}</style>
    </div>
  );
};

export default V3Modal;
