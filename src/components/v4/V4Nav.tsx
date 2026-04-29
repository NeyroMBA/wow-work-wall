import { Link } from "react-router-dom";

const V4Nav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 py-5">
        <Link to="/" className="v4-serif text-2xl">
          Школа<span className="v4-mint">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 v4-mono text-[11px] uppercase tracking-[0.2em] v4-dim">
          <a href="#wall" className="v4-link">Стена</a>
          <a href="#index" className="v4-link">Каталог</a>
          <a href="#manifest" className="v4-link">Манифест</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/" className="v4-chip">v1</Link>
          <Link to="/v2" className="v4-chip">v2</Link>
          <Link to="/v3" className="v4-chip">v3</Link>
          <span className="v4-chip" style={{ borderColor: "hsl(152 76% 58% / 0.5)", color: "hsl(40 30% 96%)" }}>
            <span className="v4-chip-dot" /> v4
          </span>
        </div>
      </div>
      <div className="v4-rule mx-8" />
    </header>
  );
};

export default V4Nav;
