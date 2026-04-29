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

  // Hero animation phases driven by scroll progress
  const titleOpacity = 1 - Math.min(progress * 2, 1);
  const titleY = -progress * 200;
  const cardScale = 0.6 + Math.min(progress * 1.4, 1) * 0.4;
  const cardY = 60 - progress * 200;
  const cardOpacity = Math.min(progress * 3, 1);
  const cardRotate = (1 - Math.min(progress * 2, 1)) * 6;

  return (
    <section ref={ref} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* ambient layers */}
        <div className="absolute inset-0 v3-grid-bg" />
        <div className="v3-blob" style={{ width: 600, height: 600, background: "hsl(158 90% 55% / 0.5)", left: "-10%", top: "10%" }} />
        <div className="v3-blob" style={{ width: 700, height: 700, background: "hsl(220 100% 65% / 0.4)", right: "-15%", bottom: "0%", animationDelay: "3s" }} />

        {/* Title */}
        <div
          className="relative z-10 text-center px-6 max-w-6xl"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-10 v3-mono text-xs uppercase tracking-[0.3em]" style={{ border: "1px solid hsl(222 30% 14%)", background: "hsl(222 40% 7% / 0.6)" }}>
            <span className="v3-dot" />
            <span>Галерея выпускных работ · 2026</span>
          </div>

          <h1 className="v3-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9]">
            Дашборды,<br/>
            <span className="v3-grad-text font-medium italic">которые</span> хочется<br/>
            <span className="font-medium">пересматривать.</span>
          </h1>

          <p className="mt-10 max-w-xl mx-auto text-lg v3-muted">
            240 работ студентов школы аналитики. Скроллите —
            каждая работа раскроется в полный размер.
          </p>

          <div className="mt-12 v3-mono text-xs uppercase tracking-widest v3-muted animate-bounce">
            ↓ скролл
          </div>
        </div>

        {/* Floating preview card */}
        <div
          className="absolute z-0 v3-card-shell v3-glow"
          style={{
            width: "min(70vw, 900px)",
            transform: `translateY(${cardY}vh) scale(${cardScale}) rotate(${cardRotate}deg)`,
            opacity: cardOpacity,
            transition: "none",
          }}
        >
          <img src={dashboards[0].image} alt="" className="w-full block" />
        </div>
      </div>
    </section>
  );
};

export default V3Hero;
