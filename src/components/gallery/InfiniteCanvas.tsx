import { useEffect, useRef, useState } from "react";
import { dashboards } from "@/data/dashboards";
import DashboardCard from "./DashboardCard";
import DashboardModal from "./DashboardModal";
import type { Dashboard } from "@/data/dashboards";

// Predefined positions for organic layout (x%, y px, scale, rotation, depth-layer)
const positions = [
  { x: 8,  y: 60,   scale: 1.05, rot: -3,  layer: 1 },
  { x: 55, y: 0,    scale: 1.2,  rot: 2,   layer: 0 },
  { x: 78, y: 220,  scale: 0.9,  rot: -2,  layer: 2 },
  { x: 5,  y: 520,  scale: 1.0,  rot: 4,   layer: 1 },
  { x: 38, y: 460,  scale: 1.15, rot: -1,  layer: 0 },
  { x: 70, y: 700,  scale: 1.0,  rot: 3,   layer: 2 },
  { x: 12, y: 980,  scale: 1.1,  rot: -2,  layer: 0 },
  { x: 48, y: 1080, scale: 0.95, rot: 1,   layer: 1 },
  { x: 75, y: 1240, scale: 1.05, rot: -3,  layer: 2 },
];

const InfiniteCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [selected, setSelected] = useState<Dashboard | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <section className="relative px-6 py-12">
        {/* Spotlight cursor */}
        <div
          className="pointer-events-none fixed w-[600px] h-[600px] rounded-full opacity-30 blur-3xl z-0 transition-transform duration-300 ease-out"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
            left: mouse.x - 300,
            top: mouse.y - 300,
          }}
        />

        <div
          ref={containerRef}
          className="relative max-w-[1600px] mx-auto"
          style={{ height: "1700px" }}
        >
          {dashboards.map((d, i) => {
            const pos = positions[i % positions.length];
            // parallax: layer 0 = slow, layer 2 = fast
            const parallaxFactor = pos.layer === 0 ? 0.05 : pos.layer === 1 ? 0.15 : 0.28;
            const yOffset = scrollY * parallaxFactor * -1;
            return (
              <DashboardCard
                key={d.id}
                dashboard={d}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: pos.y,
                  transform: `translateY(${yOffset}px) scale(${pos.scale}) rotate(${pos.rot}deg)`,
                  zIndex: 10 - pos.layer,
                  width: pos.layer === 0 ? 480 : pos.layer === 1 ? 380 : 320,
                }}
                layer={pos.layer}
                onClick={() => setSelected(d)}
              />
            );
          })}

          {/* Floating decorative blobs */}
          <div className="absolute top-[300px] left-[40%] w-32 h-32 rounded-full bg-accent-electric/20 blur-2xl animate-float-slow" style={{ background: 'hsl(var(--accent-electric) / 0.2)' }} />
          <div className="absolute top-[800px] left-[20%] w-40 h-40 rounded-full blur-3xl animate-float-medium" style={{ background: 'hsl(var(--accent-magenta) / 0.15)' }} />
        </div>
      </section>

      {selected && (
        <DashboardModal dashboard={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default InfiniteCanvas;
