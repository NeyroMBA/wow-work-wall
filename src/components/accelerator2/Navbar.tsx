import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.svg";

const acceleratorLinks = [
  { label: "Для кого", href: "#audience" },
  { label: "Программа", href: "#solution" },
  { label: "Стоимость", href: "/pricing" },
  { label: "Коворкинги", href: "/coworkings" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isInternalPage = pathname === "/cases" || pathname === "/pricing" || pathname === "/coworkings";
  const links = acceleratorLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {isInternalPage && (
            <Link
              to="/accelerator"
              aria-label="Вернуться на главную"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <a href="https://neyro.mba/study" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img src={logo} alt="НейроМВА" className="h-8 w-auto" />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const href = isInternalPage && l.href.startsWith("#") ? `/accelerator${l.href}` : l.href;
            return (
              <a key={l.href} href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            );
          })}
          <a href={isInternalPage ? "/accelerator#buy" : "#buy"} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Записаться
          </a>
        </div>


        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border px-6 pb-6"
          >
            {links.map((l) => {
              const href = isInternalPage && l.href.startsWith("#") ? `/accelerator${l.href}` : l.href;
              return (
                <a key={l.href} href={href} onClick={() => setOpen(false)} className="block py-3 text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              );
            })}

            <a href={isInternalPage ? "/accelerator#buy" : "#buy"} onClick={() => setOpen(false)} className="block mt-3 text-center py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
              Записаться
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
