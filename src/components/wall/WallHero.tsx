import { useState } from "react";
import officeClean from "@/assets/wall/office-clean.jpg";
import officeGraffiti from "@/assets/wall/office-graffiti.jpg";

interface HeroProps {
  onEnter: () => void;
  hasMask: boolean;
  onWrite?: () => void;
  onRead?: () => void;
}

export function WallHero({ onEnter, hasMask, onWrite, onRead }: HeroProps) {
  const [caught, setCaught] = useState(false);
  return (
    <section className="relative isolate min-h-screen overflow-hidden flex items-end">
      <img
        src={officeClean}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: hasMask ? 0 : 1 }}
      />
      <img
        src={officeGraffiti}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: hasMask ? 1 : 0 }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: hasMask
            ? "linear-gradient(95deg, rgba(8,8,14,0.85) 0%, rgba(8,8,14,0.55) 55%, rgba(8,8,14,0.25) 100%), linear-gradient(180deg, transparent 40%, rgba(8,8,14,0.7) 100%)"
            : "linear-gradient(95deg, rgba(245,246,248,0.92) 0%, rgba(245,246,248,0.6) 55%, rgba(245,246,248,0.15) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {!hasMask ? (
          <>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] uppercase max-w-3xl" style={{ color: "#1a1d24" }}>
              <span className="block">всё хорошо.</span>
              <span className="block" style={{ color: "#5b6270" }}>правда?</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: "#2a2e38" }}>
              Это офис «Клуба анонимных аналитиков». Чисто, тихо, корректно. <br />
              Но за этой дверью — стена, на которой говорят то, чего в общем чате не скажешь.
            </p>
            {!caught ? (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={onEnter}
                  className="spray-can-cursor inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-display uppercase tracking-wide text-lg"
                  style={{ background: "#1a1d24", color: "#f5f6f8", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)" }}
                >
                  <span className="text-xl">◉</span> войти в ту дверь
                </button>
                <button
                  onClick={() => setCaught(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-display uppercase tracking-wide text-lg border-2"
                  style={{ background: "transparent", color: "#1a1d24", borderColor: "#1a1d24" }}
                >
                  войти не в ту дверь
                </button>
              </div>
            ) : (
              <div className="mt-10 max-w-xl rounded-lg p-6 shadow-lg" style={{ background: "#f3e9d2", border: "1px solid #c8b88a", color: "#3a2f1a" }}>
                <div className="font-display uppercase text-xl sm:text-2xl leading-tight">Вас заметила налоговая служба</div>
                <p className="mt-2 text-base leading-relaxed">Рекомендуем покинуть страницу.</p>
                <button onClick={() => setCaught(false)} className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-md font-display uppercase tracking-wide" style={{ background: "#3a2f1a", color: "#f3e9d2" }}>
                  спрятаться в офисе
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.92] uppercase">
              <span className="glitch text-glow-green" data-text="дверь">дверь</span>{" "}
              <span className="opacity-80">открыта.</span>
              <span className="block">
                <span className="font-graffiti text-glow-pink" style={{ color: "var(--neon-pink)" }}>говори.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Первое правило ночного офиса — никто не знает, кто высказался в ночном офисе. Второе правило ночного офиса — то, что сказано в ночном офисе, остаётся в ночном офисе.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={onWrite} className="btn-neon">написать на стене офиса →</button>
              <button onClick={onRead} className="btn-ghost-neon">читать надписи</button>
            </div>
          </>
        )}
      </div>

      <svg width="0" height="0" className="absolute">
        <filter id="spray-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </svg>
    </section>
  );
}
