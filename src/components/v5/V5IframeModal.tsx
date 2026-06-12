import { useEffect, useRef, useState } from "react";
import type { Dashboard } from "@/data/dashboards";

type Props = { dashboard: Dashboard; onClose: () => void };

const DESKTOP_WIDTH = 1440;
const DESKTOP_MIN_HEIGHT = 1024;

const V5IframeModal = ({ dashboard, onClose }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerW, setContainerW] = useState(0);
  const [containerH, setContainerH] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      setContainerW(w);
      setContainerH(h);
      setScale(w < DESKTOP_WIDTH ? w / DESKTOP_WIDTH : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isScaled = scale < 1;
  const iframeWidth = isScaled ? DESKTOP_WIDTH : containerW;
  // Make logical iframe tall enough so the dashboard renders its full desktop layout;
  // we let the OUTER container scroll, so the user can scroll through the whole project.
  const iframeHeight = isScaled
    ? Math.max(DESKTOP_MIN_HEIGHT, containerH / scale)
    : containerH;
  const scaledHeight = iframeHeight * scale;

  return (
    <div
      className="fixed inset-0 z-[100] v5-fade"
      style={{ background: "hsl(230 35% 6% / 0.9)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="absolute inset-3 md:inset-8 rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ background: "hsl(230 35% 10% / 0.75)", backdropFilter: "blur(8px)" }}
          aria-label="Закрыть"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div
          ref={containerRef}
          className="w-full h-full overflow-auto bg-white"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {dashboard.link && containerW > 0 && (
            <div style={{ width: containerW, height: scaledHeight, position: "relative" }}>
              <iframe
                src={dashboard.link.replace(/^http:\/\//i, "https://")}
                title={dashboard.title}
                className="block bg-white"
                style={{
                  border: 0,
                  width: iframeWidth,
                  height: iframeHeight,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default V5IframeModal;
