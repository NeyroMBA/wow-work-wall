import { useEffect, useRef, useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

// Horizontal scroll-jacked stream: vertical scroll moves cards horizontally
const V3Stream = ({ onSelect }: { onSelect: (d: Dashboard) => void }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      // translate by total horizontal track width
      setX(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="stream" ref={wrapRef} className="relative" style={{ height: "300vh", background: "hsl(var(--v3-bg-2))" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 v3-grid-bg opacity-40" />

        <div className="relative z-10 max-w-[1500px] mx-auto w-full px-8 mb-10 flex items-end justify-between">
          <div>
            <div className="v3-mono text-xs uppercase tracking-[0.3em] v3-accent mb-3">Поток · scroll →</div>
            <h2 className="v3-display text-5xl md:text-7xl font-medium leading-none">
              Поток <span className="v3-grad-text italic font-medium">работ</span>.
            </h2>
          </div>
          <div className="hidden md:block v3-mono text-xs uppercase tracking-widest v3-muted">
            Прокрутите вниз, чтобы листать вбок →
          </div>
        </div>

        <div className="relative z-10 overflow-hidden">
          <div
            className="flex gap-8 px-8 will-change-transform"
            style={{ transform: `translateX(calc(20vw - ${x * 100}%))`, transition: "none" }}
          >
            {dashboards.map((d, i) => (
              <button
                key={d.id}
                onClick={() => onSelect(d)}
                className="shrink-0 v3-card-shell text-left group hover:scale-[1.02] transition-transform"
                style={{ width: "min(60vw, 720px)" }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="v3-mono text-[10px] uppercase tracking-widest v3-accent mb-2">
                      № {String(i + 1).padStart(2, "0")} · {d.category}
                    </div>
                    <h3 className="v3-display text-2xl font-medium">{d.title}</h3>
                    <p className="v3-muted text-sm mt-1">{d.author}</p>
                  </div>
                  <span className="v3-bg-accent w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default V3Stream;
