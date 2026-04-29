const V3Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl" style={{ background: "hsl(222 47% 4% / 0.6)", borderBottom: "1px solid hsl(222 30% 14%)" }}>
    <div className="max-w-[1500px] mx-auto px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="v3-dot" />
        <span className="v3-mono text-sm uppercase tracking-[0.25em]">Galaxy / Works · 26</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 v3-mono text-xs uppercase tracking-widest v3-muted">
        <a href="#showcase" className="hover:text-white transition">Витрина</a>
        <a href="#stream" className="hover:text-white transition">Поток</a>
        <a href="#all" className="hover:text-white transition">Все работы</a>
      </nav>
      <a href="#all" className="v3-bg-accent px-4 py-2 rounded-full text-xs v3-mono uppercase tracking-widest font-semibold hover:scale-105 transition-transform">
        Смотреть всё
      </a>
    </div>
  </header>
);

export default V3Nav;
