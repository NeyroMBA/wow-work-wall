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
  const [zoom, setZoom] = useState(1);
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
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setZoom(Math.min(1, w / DESKTOP_WIDTH));
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
  const safeUrl = dashboard.link?.replace(/^http:\/\//i, "https://") ?? "";

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
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {dashboard.link && (
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ background: "hsl(230 35% 10% / 0.75)", backdropFilter: "blur(8px)" }}
              aria-label="Открыть в новой вкладке"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "hsl(230 35% 10% / 0.75)", backdropFilter: "blur(8px)" }}
            aria-label="Закрыть"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div
          ref={containerRef}
          className="w-full h-full bg-white overflow-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {dashboard.link && (
            forceDesktop ? (
              <iframe
                src={safeUrl}
                title={dashboard.title}
                loading="lazy"
                className="block bg-white"
                style={{
                  border: 0,
                  width: DESKTOP_WIDTH,
                  height: `${100 / zoom}%`,
                  // CSS zoom гораздо легче по памяти, чем transform: scale,
                  // и реже приводит к перезагрузке вкладки на мобильном Safari.
                  zoom: zoom,
                }}
              />
            ) : (
              <iframe
                src={safeUrl}
                title={dashboard.title}
                loading="lazy"
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
