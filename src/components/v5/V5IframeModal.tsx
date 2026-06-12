import { useEffect, useRef, useState } from "react";
import type { Dashboard } from "@/data/dashboards";

type Props = { dashboard: Dashboard; onClose: () => void };

// Кейсы, реально адаптированные под мобильную версию — открываем в нативном виде.
const MOBILE_READY_IDS = new Set<string>([
  "fin-health",
  "student_dash11",
  "student_dash10",
  "student_dash12",
  "tokarev-ecom",
  "tokarev-nba",
  "skvorcova-snow",
]);

const DESKTOP_WIDTH = 1440;

const V5IframeModal = ({ dashboard, onClose }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerW, setContainerW] = useState(0);
  const [containerH, setContainerH] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isMobileReady = MOBILE_READY_IDS.has(dashboard.id);

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
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        setContainerW(w);
        setContainerH(h);
        setScale(Math.min(1, w / DESKTOP_WIDTH));
      }
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Принудительная десктоп-раскладка только для немобильных кейсов на мобиле.
  const forceDesktop = !isMobileReady && isMobile;
  const scaledHeight = forceDesktop && scale > 0 ? containerH / scale : containerH;

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
          className={`w-full h-full bg-white ${forceDesktop ? "overflow-auto" : "overflow-hidden"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {dashboard.link && (
            forceDesktop ? (
              <div style={{ width: containerW, height: scaledHeight, position: "relative" }}>
                <iframe
                  src={dashboard.link.replace(/^http:\/\//i, "https://")}
                  title={dashboard.title}
                  className="block bg-white"
                  style={{
                    border: 0,
                    width: DESKTOP_WIDTH,
                    height: scaledHeight / scale,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                />
              </div>
            ) : (
              <iframe
                src={dashboard.link.replace(/^http:\/\//i, "https://")}
                title={dashboard.title}
                className="block w-full h-full bg-white"
                style={{ border: 0 }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default V5IframeModal;
