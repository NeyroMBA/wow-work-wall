const V3Nav = () => (
  <header className="relative z-20 border-b v3-border">
    <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full v3-bg-accent" />
        <span className="v3-display text-2xl font-medium tracking-tight">Atelier&nbsp;des&nbsp;Données</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm v3-mono uppercase tracking-widest v3-muted">
        <a href="#" className="hover:v3-ink transition-colors">Issue 04</a>
        <a href="#" className="hover:v3-ink transition-colors">Archive</a>
        <a href="#" className="hover:v3-ink transition-colors">Studios</a>
        <a href="#" className="hover:v3-ink transition-colors">Submit</a>
      </nav>
      <div className="v3-mono text-xs uppercase tracking-widest v3-muted">Spring · 2026</div>
    </div>
  </header>
);

export default V3Nav;
