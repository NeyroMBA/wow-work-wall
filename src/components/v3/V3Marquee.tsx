const items = [
  "Sales Analytics", "★", "Revenue Forecasting", "★", "Cohort Retention", "★",
  "Geo Heatmaps", "★", "Real-time SLA", "★", "Portfolio Yield", "★",
  "People Analytics", "★", "Crypto Order Books", "★",
];

const V3Marquee = () => (
  <div className="relative z-10 border-y v3-border py-4 overflow-hidden v3-warm-bg">
    <div className="flex v3-marquee whitespace-nowrap">
      {[...items, ...items, ...items].map((t, i) => (
        <span key={i} className={`mx-6 v3-mono text-sm uppercase tracking-widest ${t === "★" ? "v3-accent" : "v3-ink"}`}>
          {t}
        </span>
      ))}
    </div>
  </div>
);

export default V3Marquee;
