import { useEffect } from "react";
import type { Dashboard } from "@/data/dashboards";

const V3Modal = ({ dashboard, onClose }: { dashboard: Dashboard; onClose: () => void }) => {
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
    <div className="fixed inset-0 z-50 v3-scope overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "hsl(38 30% 95% / 0.96)", backdropFilter: "blur(8px)" }} />
      <div
        className="relative max-w-[1200px] mx-auto my-8 md:my-16 v3-paper-bg border v3-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border v3-border v3-paper-bg v3-mono text-sm hover:v3-bg-accent hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="p-8 md:p-14">
          <div className="grid grid-cols-12 gap-6 mb-8 items-baseline">
            <div className="col-span-12 md:col-span-2 v3-mono text-xs uppercase tracking-widest v3-accent">
              Cover<br/>Story
            </div>
            <h2 className="col-span-12 md:col-span-10 v3-display text-5xl md:text-7xl font-medium leading-[0.95]">
              {dashboard.title}
            </h2>
          </div>

          <div className="v3-rule mb-8" />

          <div className="aspect-[16/9] overflow-hidden border v3-border mb-10">
            <img src={dashboard.image} alt={dashboard.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3 space-y-4 v3-mono text-xs uppercase tracking-widest">
              <div>
                <div className="v3-muted mb-1">Author</div>
                <div>{dashboard.author}</div>
              </div>
              <div>
                <div className="v3-muted mb-1">Cohort</div>
                <div>{dashboard.cohort}</div>
              </div>
              <div>
                <div className="v3-muted mb-1">Category</div>
                <div>{dashboard.category}</div>
              </div>
              <div>
                <div className="v3-muted mb-1">Stack</div>
                <div>{dashboard.tools.join(" · ")}</div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="v3-display text-2xl md:text-3xl leading-snug font-light first-letter:v3-display first-letter:text-7xl first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:v3-accent">
                {dashboard.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V3Modal;
