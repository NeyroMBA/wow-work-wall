import { Link } from "react-router-dom";

const V5Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <div className="flex items-center justify-between px-8 py-5">
      <Link to="/" className="v5-serif text-2xl">
        Школа<span className="v5-mint">.</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 v5-mono text-[11px] uppercase tracking-[0.2em] v5-dim">
        <a href="#gallery" className="hover:text-foreground transition">Галерея</a>
        <a href="#course" className="hover:text-foreground transition">Курс</a>
      </nav>
      <div className="flex items-center gap-2">
        <Link to="/" className="v5-chip">v1</Link>
        <Link to="/v2" className="v5-chip">v2</Link>
        <Link to="/v3" className="v5-chip">v3</Link>
        <Link to="/v4" className="v5-chip">v4</Link>
        <span className="v5-chip v5-chip--active"><span className="v5-chip-dot" style={{ background: "hsl(var(--v5-bg))", boxShadow: "none" }} /> v5</span>
      </div>
    </div>
    <div className="v5-rule mx-8" />
  </header>
);

export default V5Nav;
