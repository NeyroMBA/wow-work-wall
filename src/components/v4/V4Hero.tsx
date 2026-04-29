import { useEffect, useRef, useState } from "react";

const V4Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      setT(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative pt-32 pb-24 px-8 v4-grain">
      {/* top meta */}
      <div className="flex justify-between items-end mb-16 v4-mono text-[10px] uppercase tracking-[0.22em] v4-dim">
        <div>Издание №04 — 2026</div>
        <div className="hidden md:block">240 работ · 18 когорт · 9 индустрий</div>
        <div>Москва · 55.75°N</div>
      </div>

      <div className="v4-rule mb-16" />

      {/* big editorial title */}
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-2 v4-mono text-[11px] uppercase tracking-[0.2em] v4-dim">
          <div>№ 001</div>
          <div className="mt-1">Главная</div>
        </div>

        <h1 className="col-span-12 md:col-span-10 v4-serif text-[14vw] md:text-[11vw] leading-[0.88]">
          <span className="block">Галерея</span>
          <span className="block italic v4-violet">выпускных</span>
          <span className="block">работ.</span>
        </h1>
      </div>

      <div className="v4-rule my-16" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5 md:col-start-3">
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "hsl(40 30% 90%)" }}>
            Двести сорок дашбордов, рождённых в темноте редакторов и
            отшлифованных <em className="v4-serif v4-mint">данными</em>. Скролльте, чтобы
            увидеть стену работ — она поворачивается вместе с вами.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-9 v4-mono text-[11px] uppercase tracking-[0.2em] v4-dim flex flex-col gap-2">
          <div className="flex justify-between"><span>Категории</span><span className="v4-mint">9</span></div>
          <div className="v4-rule" />
          <div className="flex justify-between"><span>Авторы</span><span className="v4-mint">240</span></div>
          <div className="v4-rule" />
          <div className="flex justify-between"><span>Часов работы</span><span className="v4-mint">28 800</span></div>
          <div className="v4-rule" />
          <div className="flex justify-between"><span>Чашек кофе</span><span className="v4-mint">∞</span></div>
        </div>
      </div>

      <div className="mt-20 flex items-center gap-6 v4-mono text-[10px] uppercase tracking-[0.25em] v4-dim">
        <div
          className="h-px bg-current transition-all duration-300"
          style={{ width: `${40 + t * 200}px`, opacity: 0.4 + t * 0.6 }}
        />
        <span>скролл вниз — стена оживает</span>
      </div>
    </section>
  );
};

export default V4Hero;
