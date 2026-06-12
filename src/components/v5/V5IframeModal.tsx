import { useEffect } from "react";
import type { Dashboard } from "@/data/dashboards";

type Props = { dashboard: Dashboard; onClose: () => void };

const V5IframeModal = ({ dashboard, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          className="w-full h-full overflow-hidden bg-white"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {dashboard.link && (
            <iframe
              src={dashboard.link.replace(/^http:\/\//i, "https://")}
              title={dashboard.title}
              className="block w-full h-full bg-white"
              style={{ border: 0 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default V5IframeModal;
