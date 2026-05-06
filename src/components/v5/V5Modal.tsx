import { useEffect } from "react";
import type { Dashboard } from "@/data/dashboards";

const CATEGORY_LABEL: Record<Dashboard["category"], string> = {
  Sales: "Продажи",
  Finance: "Финансы",
  Marketing: "Маркетинг",
  HR: "HR",
  Health: "Здоровье",
  SaaS: "SaaS",
  Logistics: "Логистика",
  RealEstate: "Недвижимость",
  Support: "Поддержка",
};

type Props = { dashboard: Dashboard; onClose: () => void };

const V5Modal = ({ dashboard, onClose }: Props) => {
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
      style={{ background: "hsl(230 35% 6% / 0.85)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="absolute inset-6 md:inset-16 v5-glass overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 v5-chip z-10">
          esc · закрыть
        </button>
        <div className="grid grid-cols-12 gap-6 p-8 md:p-14">
          <div className="col-span-12 md:col-span-2 v5-mono text-[10px] uppercase tracking-[0.22em] v5-dim">
            № {String(dashboard.id).padStart(3, "0")}
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="v5-mono text-[11px] uppercase tracking-[0.2em] v5-green mb-3">
              {CATEGORY_LABEL[dashboard.category]} · {dashboard.cohort}
            </div>
            <h3 className="v5-display text-5xl md:text-7xl leading-[0.95] mb-4">{dashboard.title}</h3>
            <div className="v5-mono text-xs uppercase tracking-[0.18em] v5-dim">
              автор — {dashboard.author}
            </div>
          </div>
          <div className="col-span-12 mt-6">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "hsl(230 25% 22%)" }}>
              <img src={dashboard.image} alt={dashboard.title} className="w-full block" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-3 mt-8 space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "hsl(40 30% 90%)" }}>
              {dashboard.description}
            </p>
            {dashboard.link && (
              <a
                href={dashboard.link}
                target="_blank"
                rel="noopener noreferrer"
                className="v5-cta-btn"
              >
                Открыть интерактивную версию →
              </a>
            )}
          </div>
          <div className="col-span-12 md:col-span-2 mt-8 v5-mono text-[10px] uppercase tracking-[0.22em] v5-dim">
            <div>стек</div>
            <div className="mt-2 flex flex-col gap-1 v5-green">
              {dashboard.tools.map((t) => <span key={t}>· {t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V5Modal;
