import { useEffect, useRef, useState } from "react";
import { dashboards } from "@/data/dashboards";

const V3Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three phases:
  // 0.0 - 0.35: title visible, card flies in from depth (small → medium, behind text)
  // 0.35 - 0.7: title fades up & out, card scales to full hero size in center
  // 0.7 - 1.0: card stays large, label "Работа 01" + hint "продолжайте скролл" appears
  const p = progress;

  const titleOpacity = p < 0.3 ? 1 : Math.max(0, 1 - (p - 0.3) / 0.2);
  const titleY = -p * 120;

  // Card grows from 0.4 to 1.0 over the whole scroll
  const cardScale = 0.45 + Math.min(p / 0.7, 1) * 0.55;
  const cardOpacity = Math.min(p * 4, 1);
  // Card stays centered (no Y drift) — only scales
  const cardY = 0;

  const revealLabel = p > 0.65 ? Math.min((p - 0.65) / 0.2, 1) : 0;

  return (
    <section ref={ref} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* ambient layers */}
        <div className="absolute inset-0 v3-grid-bg" />
        <div className="v3-blob" style={{ width: 600, height: 600, background: "hsl(158 90% 55% / 0.5)", left: "-10%", top: "10%" }} />
        <div className="v3-blob" style={{ width: 700, height: 700, background: "hsl(220 100% 65% / 0.4)", right: "-15%", bottom: "0%", animationDelay: "3s" }} />

        {/* Title — стоит поверх в начале, плавно уходит */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          <div className="text-center px-6 max-w-6xl">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-10 v3-mono text-xs uppercase tracking-[0.3em]"
              style={{ border: "1px solid hsl(222 30% 14%)", background: "hsl(222 40% 7% / 0.6)", backdropFilter: "blur(8px)" }}
            >
              <span className="v3-dot" />
              <span>Галерея выпускных работ · 2026</span>
            </div>

            <h1 className="v3-display text-[clamp(3rem,9vw,9rem)] leading-[0.9]">
              Дашборды,<br/>
              <span className="v3-grad-text font-medium italic">которые</span> хочется<br/>
              <span className="font-medium">пересматривать.</span>
            </h1>

            <p className="mt-8 max-w-xl mx-auto text-lg v3-muted">
              240 работ студентов школы аналитики.
            </p>

            <div className="mt-10 v3-mono text-xs uppercase tracking-widest v3-muted animate-bounce">
              ↓ скролл — работа появится
            </div>
          </div>
        </div>

        {/* Floating preview card — фиксированно по центру, только масштаб */}
        <div
          className="absolute z-10 v3-card-shell v3-glow"
          style={{
            width: "min(78vw, 1100px)",
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            opacity: cardOpacity,
            transition: "none",
            transformOrigin: "center center",
          }}
        >
          <img src={dashboards[0].image} alt="" className="w-full block" />

          {/* Лейбл появляется когда карточка большая */}
          <div
            className="absolute top-4 left-4 v3-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              opacity: revealLabel,
              background: "hsl(var(--v3-bg) / 0.7)",
              border: "1px solid hsl(var(--v3-line))",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="v3-accent">●</span> Работа 01 / 240 — {dashboards[0].author}
          </div>
          <div
            className="absolute bottom-4 right-4 v3-bg-accent px-3 py-1.5 rounded-full v3-mono text-[10px] uppercase tracking-widest font-bold"
            style={{ opacity: revealLabel }}
          >
            ↓ продолжайте скролл — ещё 5 сцен
          </div>
        </div>

        {/* Прогресс-индикатор справа */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3">
          <div className="v3-mono text-[10px] uppercase tracking-widest v3-muted rotate-90 origin-center whitespace-nowrap mb-8">
            Intro
          </div>
          <div className="w-0.5 h-40 rounded-full overflow-hidden" style={{ background: "hsl(222 30% 14%)" }}>
            <div
              className="w-full"
              style={{
                height: `${progress * 100}%`,
                background: "linear-gradient(180deg, hsl(var(--v3-accent)), hsl(var(--v3-accent-2)))",
              }}
            />
          </div>
          <div className="v3-mono text-[10px] v3-accent font-bold">{Math.round(progress * 100)}%</div>
        </div>
      </div>
    </section>
  );
};

export default V3Hero;
