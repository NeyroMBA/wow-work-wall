import { Link } from "react-router-dom";
import logo from "@/assets/ina-logo-dark.svg";

const V5Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "hsl(0 0% 4% / 0.7)" }}>
    <div className="flex items-center justify-between px-6 md:px-10 py-4">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="ИНА" className="h-8 w-auto" />
        <span className="hidden sm:inline text-sm font-semibold tracking-tight" style={{ color: "hsl(var(--ina-gray))" }}>
          Институт Нейро-Аналитики
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium v5-dim">
        <a href="#gallery" className="hover:text-foreground transition">Галерея</a>
        <a href="#course" className="hover:text-foreground transition">Курс</a>
      </nav>
      <div className="flex items-center gap-2">
        <Link to="/" className="v5-chip">v1</Link>
        <Link to="/v2" className="v5-chip">v2</Link>
        <Link to="/v3" className="v5-chip">v3</Link>
        <Link to="/v4" className="v5-chip">v4</Link>
        <span className="v5-chip v5-chip--active"><span className="v5-chip-dot" style={{ background: "hsl(var(--ina-black))", boxShadow: "none" }} /> v5</span>
      </div>
    </div>
    <div className="v5-rule mx-6 md:mx-10" />
  </header>
);

export default V5Nav;
