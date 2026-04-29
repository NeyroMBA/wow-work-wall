import { useEffect, useRef, useState } from "react";
import { dashboards } from "@/data/dashboards";
import DashboardCard from "./DashboardCard";
import type { Dashboard } from "@/data/dashboards";

// Compact, denser layout — ~55vh tall, no big empty pockets.
// Coordinates tuned so cards interlock without big gaps.
const positions = [
  { x: 2,  y: 20,  scale: 1.0,  rot: -3, layer: 1, w: 320 },
  { x: 26, y: 0,   scale: 1.05, rot: 2,  layer: 0, w: 380 },
  { x: 54, y: 60,  scale: 0.95, rot: -2, layer: 1, w: 300 },
  { x: 76, y: 10,  scale: 1.0,  rot: 3,  layer: 2, w: 300 },
  { x: 8,  y: 320, scale: 1.0,  rot: 2,  layer: 2, w: 300 },
  { x: 32, y: 360, scale: 1.0,  rot: -1, layer: 1, w: 320 },
  { x: 58, y: 340, scale: 1.0,  rot: 3,  layer: 0, w: 340 },
  { x: 82, y: 380, scale: 0.9,  rot: -2, layer: 2, w: 280 },
];

const CollageStrip = ({ onSelect }: { onSelect: (d: Dashboard) => void }) => {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // take 8 dashboards for the collage
  const items = dashboards.slice(0, 8);

  return (
    <section className="relative px-6 py-8">
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full opacity-25 blur-3xl z-0"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)",
          left: mouse.x - 250,
          top: mouse.y - 250,
        }}
      />

      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-6 px-2">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Featured</div>
            <h2 className="font-display text-2xl md:text-3xl font-light">Избранные работы</h2>
          </div>
          <div className="text-xs text-muted-foreground hidden md:block">наведите · откройте</div>
        </div>

        <div
          ref={ref}
          className="relative mx-auto"
          style={{ height: 720 }}
        >
          {items.map((d, i) => {
            const pos = positions[i];
            return (
              <DashboardCard
                key={d.id}
                dashboard={d}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: pos.y,
                  transform: `scale(${pos.scale}) rotate(${pos.rot}deg)`,
                  zIndex: 10 - pos.layer,
                  width: pos.w,
                }}
                layer={pos.layer}
                onClick={() => onSelect(d)}
              />
            );
          })}

          <div className="absolute top-[180px] left-[45%] w-32 h-32 rounded-full blur-2xl animate-float-slow pointer-events-none" style={{ background: 'hsl(var(--accent-electric) / 0.2)' }} />
          <div className="absolute top-[420px] left-[15%] w-40 h-40 rounded-full blur-3xl animate-float-medium pointer-events-none" style={{ background: 'hsl(var(--accent-magenta) / 0.15)' }} />
        </div>
      </div>
    </section>
  );
};

export default CollageStrip;
