import { useEffect, useRef, useState } from "react";
import { dashboards, type Dashboard } from "@/data/dashboards";

type Props = { onSelect: (d: Dashboard) => void };

// Cinematic scroll: each scene "snaps" into focus as it scrolls past.
const scenes = dashboards.slice(0, 5);

const V3Showcase = ({ onSelect }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      const idx = Math.min(scenes.length - 1, Math.floor(p * scenes.length));
      const inSceneP = (p * scenes.length) - idx;
      setActive(idx);
      setLocalProgress(inSceneP);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="showcase" ref={wrapRef} className="relative" style={{ height: `${scenes.length * 130}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 v3-grid-bg opacity-50" />
        <div className="v3-blob" style={{ width: 500, height: 500, background: "hsl(158 90% 55% / 0.4)", left: "-5%", top: "20%" }} />
        <div className="v3-blob" style={{ width: 600, height: 600, background: "hsl(220 100% 65% / 0.35)", right: "-10%", bottom: "10%", animationDelay: "4s" }} />

        <div className="relative z-10 max-w-[1500px] mx-auto px-8 w-full grid grid-cols-12 gap-8 items-center">
          {/* LEFT — text panel */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="v3-mono text-xs uppercase tracking-[0.3em] v3-accent flex items-center gap-3">
              <span>Сцена</span>
              <span className="v3-grad-text font-bold text-2xl">{String(active + 1).padStart(2, "0")}</span>
              <span className="v3-muted">/ {String(scenes.length).padStart(2, "0")}</span>
            </div>

            <div key={active} style={{ animation: "v3-fade 0.6s ease-out both" }}>
              <div className="v3-mono text-xs uppercase tracking-widest v3-muted mb-3">
                {scenes[active].category} · {scenes[active].cohort}
              </div>
              <h2 className="v3-display text-5xl md:text-6xl font-medium leading-[0.95]">
                {scenes[active].title}
              </h2>
              <p className="mt-4 text-base v3-muted">
                Автор: <span className="text-white">{scenes[active].author}</span>
              </p>
              <p className="mt-6 text-lg leading-relaxed">
                {scenes[active].description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {scenes[active].tools.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full v3-mono text-[11px] uppercase tracking-widest" style={{ border: "1px solid hsl(222 30% 14%)", background: "hsl(222 40% 7%)" }}>{t}</span>
                ))}
              </div>

              <button
                onClick={() => onSelect(scenes[active])}
                className="mt-8 v3-bg-accent px-6 py-3 rounded-full v3-mono text-xs uppercase tracking-widest font-semibold hover:scale-105 transition-transform"
              >
                Открыть работу →
              </button>
            </div>

            {/* progress bar */}
            <div className="pt-6 flex gap-1.5">
              {scenes.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: "hsl(222 30% 14%)" }}>
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      background: "hsl(var(--v3-accent))",
                      width: i < active ? "100%" : i === active ? `${localProgress * 100}%` : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — stacked cards */}
          <div className="col-span-12 md:col-span-8 relative h-[60vh] md:h-[75vh]">
            {scenes.map((d, i) => {
              const offset = i - active;
              const isPast = offset < 0;
              const isFuture = offset > 0;
              const isActive = offset === 0;

              const baseScale = isActive ? 1 : isFuture ? 0.85 - offset * 0.05 : 0.9;
              const ty = isActive
                ? -localProgress * 30
                : isFuture
                  ? 60 + offset * 30
                  : -120;
              const tx = isFuture ? offset * 40 : isPast ? -100 : 0;
              const opacity = isPast ? 0 : isFuture ? Math.max(0, 1 - offset * 0.3) : 1;
              const rot = isFuture ? offset * 2 : isPast ? -8 : -localProgress * 1.5;

              return (
                <button
                  key={d.id}
                  onClick={() => onSelect(d)}
                  className="absolute inset-0 v3-card-shell v3-glow"
                  style={{
                    transform: `translate(${tx}px, ${ty}px) scale(${baseScale}) rotate(${rot}deg)`,
                    opacity,
                    zIndex: 100 - Math.abs(offset),
                    transition: isActive ? "none" : "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
                  {isActive && (
                    <div className="absolute bottom-4 right-4 v3-bg-accent px-3 py-1.5 rounded-full v3-mono text-[10px] uppercase tracking-widest font-bold">
                      Кликни →
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@keyframes v3-fade { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }`}</style>
    </section>
  );
};

export default V3Showcase;
